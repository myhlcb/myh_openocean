import cron from 'node-cron';
import _ from 'lodash';
import { Promise } from 'bluebird';
import OpenoceanService from '../service/exchanges/openocean';
import { createConnect, closeConnect } from '../connection/mysql';
import redis from '../connection/redis';

import { Token } from '../entities/token.entity';
import { Quote } from '../entities/quote.entity';
const service: OpenoceanService = new OpenoceanService();

const updateTokenTable = async () => {
  await createConnect();
  const supportedChains = await service.chains();

  const chains = _.map(supportedChains, 'chainCode');

  console.log(`get chains length:${chains.length}`);
  // 保存tokens
  await Promise.map(chains, async (chain) => {
    const getToken = await service.tokenList(chain);
    const tokenList = getToken.data || [];
    console.log(
      `getToken with chain:${chain} and tokenList length:${tokenList.length}`
    );
    // 按照chains存储到redis
    await redis.hset('openocean:tokenList', chain, JSON.stringify(tokenList));

    return Promise.map(tokenList, async (token) => {
      const {
        code,
        name,
        address,
        decimals,
        symbol,
        chain,
        provider = 'openocean',
      } = token;
      const params = {
        code,
        name,
        address,
        decimals,
        symbol,
        chain,
        provider,
      };
      const t = await Token.findOneBy({
        provider,
        name,
        chain,
        symbol,
        address,
      });
      if (t) {
        console.log(`t exists with id ${t.id} and update`);
        return Token.update({ id: t.id }, params);
      } else {
        console.log(`t not exists and update with name:${name}`);
        return Token.create(params as any).save();
      }
    });
  });
  redis.expire('openocean:tokenList', 60 * 60 * 2); // 设置过期时间为2小时
  console.log('update token list success');
  await closeConnect();
};

const updateQuoteTable = async () => {
  await createConnect();
  console.log('start update quote ...');
  const tokens = await Token.find({
    where: { provider: 'openocean' },
    order: { decimals: 'ASC' },
  });
  // 保存报价
  for (let i = 0; i < tokens.length; i++) {
    const inToken = tokens[i];
    const { address: inAddress, chain } = inToken;
    for (let j = i + 1; j < tokens.length; j++) {
      const outToken = tokens[j];
      const { address: outAddress } = outToken;
      const quote = await service.quote(chain, inAddress, outAddress);
      if (quote.code === 200) {
        const { data } = quote;
        const {
          inToken: { symbol: inTokenSymbol },
          outToken: { symbol: outTokenSymbol },
          dexes = [],
        } = data;
        await Promise.map(dexes, async (item) => {
          const { dexCode, swapAmount } = item;
          const params = {
            provider: 'openocean',
            chain,
            inTokenAddress: inAddress,
            inTokenSymbol,
            outTokenAddress: outAddress,
            outTokenSymbol,
            dex: dexCode,
            swapAmount,
          };
          const q = await Quote.findOneBy({
            provider: 'openocean',
            chain,
            inTokenSymbol,
            outTokenSymbol,
            dex: dexCode,
          });
          if (q) {
            await Quote.update({ id: q.id }, params);
          } else {
            await Quote.create(params as any).save();
          }
        });
      }
    }
  }

  await closeConnect();
};

export function startTokenSyncJob() {
  cron.schedule('0 * * * *', async () => {
    await updateTokenTable();
  });
}
export function startQuoteSyncJob() {
  cron.schedule('0 */2 * * *', async () => {
    await updateQuoteTable();
  });
}
