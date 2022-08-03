import { retrieve } from './redis.ts';

const castToNumber = (number: string): number => number ? Number(number) : 0;

export async function waitForServiceC ( seconds: number, cid: string): Promise<number> {
	const result = new Promise((resolve) => {
		setTimeout(async () => {
			const exchange = await retrieve(cid);
			resolve(castToNumber(exchange));
		}, seconds);
	});
	return await result;
}
