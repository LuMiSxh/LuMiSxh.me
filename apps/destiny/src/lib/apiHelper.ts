import { SECRET_API_KEY } from '$env/static/private';

export function fetchParams({
	contentType = 'application/json',
	method = 'GET',
	body = undefined
}: {
	contentType?: string;
	method?: 'POST' | 'GET';
	body?: undefined | string;
}) {
	return {
		method: method,
		headers: {
			'Content-Type': contentType,
			'X-API-Key': SECRET_API_KEY
		},
		body: body
	};
}

interface fetchBungieReturn<T = any> {
	ResponseStatus: number;
	ResponseStatusMessage: string;
	data: T;
}
export async function fetchBungie<Type = any>(
	fetch: any,
	url: string,
	params: {
		method: 'POST' | 'GET';
		headers: { 'Content-Type': string; 'X-API-Key': string };
		body: string | undefined;
	}
): Promise<fetchBungieReturn<Type>> {
	const response = await fetch(url, params);

	if (response.status !== 200) {
		return {
			ResponseStatus: response.status,
			ResponseStatusMessage: response.ErrorStatus,
			data: undefined as Type
		};
	}

	return {
		ResponseStatus: response.status,
		ResponseStatusMessage: response.ErrorStatus,
		data: (await response.json()) as Type
	};
}
