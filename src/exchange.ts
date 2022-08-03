import { API_URL, CALLBACK_URL } from './consts.ts';
import { waitForServiceC } from './helpers.ts';

export async function firstExchange(currency: string): Promise<number> {
	const response = await fetch(
		`${API_URL}/servico-a/cotacao?moeda=${currency}`,
		{ method: 'GET' },
	);
	const { cotacao } = await response.json();
	return cotacao;
}

export async function secondExchange(currency: string): Promise<number> {
	const response = await fetch(
		`${API_URL}/servico-b/cotacao?curr=${currency}`,
		{ method: 'GET' },
	);
	const { cotacao } = await response.json();
	return cotacao.valor / cotacao.fator;
}

export async function thirdExchange(currency: string): Promise<number> {
	const body = { tipo: currency, callback: CALLBACK_URL };
	const response = await fetch(`${API_URL}/servico-c/cotacao`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' },
	});
	const data = await response.json();
	return await waitForServiceC(5000, data.cid);
}
