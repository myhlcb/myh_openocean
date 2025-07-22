const Joi = require('joi');
import OpenoceanService from '../../service/exchanges/openocean';
import redis from '../../connection/redis';
import { Token } from '../../entities/token.entity';
class OpenoceanController {
  private service: OpenoceanService = new OpenoceanService();

  public chains = async (ctx) => {
    const chains = await this.service.chains();
    ctx.body = { list: chains };
  };

  public tokenList = async (ctx) => {
    const result = ctx.state.JoiValid(ctx.request.query, {
      chain: Joi.string().required(),
    });
    const { chain } = result.value;
    const cacheChain = await redis.hget('openocean:tokenList', chain);
    if (cacheChain) {
      const data = JSON.parse(cacheChain);
      ctx.body = { data };
      return;
    } else {
      const data = await Token.find({
        where: { chain, provider: 'openocean' },
      });
      await redis.hset('openocean:tokenList', chain, JSON.stringify(data));
      redis.expire('openocean:tokenList', 60 * 60 * 2); // 设置过期时间为24小时
      ctx.body = { data };
      return;
    }
  };

  public gasPrice = async (ctx) => {
    const result = ctx.state.JoiValid(ctx.request.query, {
      chain: Joi.string().required(),
    });
    const { chain } = result.value;
    const data = await this.service.gasPrice(chain);
    ctx.body = data;
  };

  public quote = async (ctx) => {
    const result = ctx.state.JoiValid(ctx.request.query, {
      chain: Joi.string().required(),
      inToken: Joi.string().required(),
      outToken: Joi.string().required(),
      amount: Joi.string().optional(),
      gasPrice: Joi.string().optional(),
    });
    const { chain, inToken, outToken, amount, gasPrice } = result.value;
    const data = await this.service.quote(
      chain,
      inToken,
      outToken,
      amount,
      gasPrice
    );
    ctx.body = data;
  };

  public swap = async (ctx) => {
    const result = ctx.state.JoiValid(ctx.request.query, {
      chain: Joi.string().required(),
      inToken: Joi.string().required(),
      outToken: Joi.string().required(),
      amount: Joi.string().optional(),
      gasPrice: Joi.string().optional(),
      slippage: Joi.string().optional().default('1'),
    });
    const { chain, inToken, outToken, amount, gasPrice, slippage } =
      result.value;
    const data = await this.service.buildSwapTx(
      chain,
      inToken,
      outToken,
      amount,
      gasPrice,
      slippage
    );
    ctx.body = data;
  };
}

export default new OpenoceanController();
