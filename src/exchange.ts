import { API_URL, CALLBACK_URL } from './consts.ts';
import { waitForServiceC } from './helpers.ts';

export const firstExchange = async (currency: string): Promise<number> => {
	const response = await fetch(
		`${API_URL}/servico-a/cotacao?moeda=${currency}`,
		{ method: 'GET' },
	);
	const { cotacao } = await response.json();
	return cotacao;
};

export const secondExchange = async (currency: string): Promise<number> => {
	const response = await fetch(
		`${API_URL}/servico-b/cotacao?curr=${currency}`,
		{ method: 'GET' },
	);
	const { cotacao } = await response.json();
	return cotacao.valor / cotacao.fator;
};

export const thirdExchange = async (currency: string): Promise<number> => {
	const body = { tipo: currency, callback: CALLBACK_URL };
	const response = await fetch(`${API_URL}/servico-c/cotacao`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' },
	});
	const data = await response.json();
	return await waitForServiceC(5000, data.cid);
};
