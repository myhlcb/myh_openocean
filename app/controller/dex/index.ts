const Joi = require('joi');
import OpenoceanService from '../../service/exchanges/openocean';
import redis from '../../connection/redis';
import { Token } from '../../entities/token.entity';
class DexController {
  public tokenList = async (ctx) => {
    const result = ctx.state.JoiValid(ctx.request.query, {
      provider: Joi.string().required(),
      chain: Joi.string().required(),
    });
    const { provider, chain } = result.value;
    const cacheChain = await redis.hget(`${provider}:tokenList`, chain);
    if (cacheChain) {
      const data = JSON.parse(cacheChain);
      ctx.body = { data };
      return;
    } else {
      const data = await Token.find({
        where: { chain, provider },
      });

      await redis.hset(`${provider}:tokenList`, chain, JSON.stringify(data));

      redis.expire(`${provider}:tokenList`, 60 * 60 * 2); // 设置过期时间为24小时
      ctx.body = { data };
      return;
    }
  };
}

export default new DexController();
