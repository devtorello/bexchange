import { REDIS_HOSTNAME, REDIS_PORT } from './consts.ts';
import { RedisConnect } from './deps.ts';

const redis = await RedisConnect({
	hostname: REDIS_HOSTNAME,
	port: REDIS_PORT,
});

export async function save(cid: string, value: number): Promise<void> {
	await redis.set(cid, value);
}

export async function retrieve(cid: string): Promise<number> {
	return await redis.get(cid);
}
