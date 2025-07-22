const Redis = require('ioredis');
const config = require('config');
const redisConfig = config.get('redisConfig');

const redis = new Redis(redisConfig);

export default redis;

export async function setRedisKey(key: string, val: string) {
  return redis.set(key, val);
}
export async function setRedisEXKey(key: string, val: string, time: number) {
  return redis.set(key, val, 'EX', time);
}
export async function setRedisNXKey(key: string, val: string, time: number) {
  return redis.set(key, val, 'NX', time);
}

export async function existRedisKey(key) {
  return redis.exist(key);
}
export async function hexistRedisKey(key, name) {
  return redis.hexists(key, name);
}

export async function delRedisKey(key: string) {
  return redis.del(key);
}
export async function ttlRedisKey(key: string) {
  return redis.ttl(key);
}
export async function expireRedisKey(key: string, time: number) {
  return redis.expire(key, time);
}

export async function hsetRedisKey(key, field: string, value: string) {
  return redis.hset(key, field, value);
}

export async function getRedisKey(key) {
  return redis.get(key);
}
export async function hgetRedisKey(key, name) {
  return redis.hget(key, name);
}
export async function hgetRedisAll(key: string) {
  return redis.hgetall(key);
}
