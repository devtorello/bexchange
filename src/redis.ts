import { REDIS_HOSTNAME, REDIS_PORT } from './consts.ts';
import { RedisConnect } from './deps.ts';

const redis = await RedisConnect({ hostname: REDIS_HOSTNAME, port: REDIS_PORT });

export const save = async (cid: string, value: number): Promise<void> => await redis.set(cid, value);

export const retrieve = async (cid: string): Promise<number> => await redis.get(cid);
