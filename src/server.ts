import { firstExchange, secondExchange, thirdExchange } from './exchange.ts';
import { Application, Router } from './deps.ts';
import { save } from './redis.ts';

const router = new Router();

router.post('/servico-c/callback', async (ctx): Promise<void> => {
	const body = ctx.request.body({ type: 'json', limit: 0 });
	const parsed = await body.value;
	save(parsed.cid, parsed.v / parsed.f);
	ctx.response.status = 202;
});

router.get('/:currency', async (ctx): Promise<void> => {
	const currency = ctx.params.currency;
	const rawExchanges = await Promise
		.all([
			firstExchange(currency),
			secondExchange(currency),
			thirdExchange(currency),
		]);
	const exchanges = rawExchanges.filter((exchange) => !!exchange);
	ctx.response.body = {
		bestExchange: Math.min(...exchanges),
		exchanges,
		currency,
	};
	ctx.response.status = 200;
});

router.get('/', (ctx): void => ctx.response.body = 'i am alive! :)');

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
