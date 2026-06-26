import { API_BASE_URL, API_VERSION, API_TIMEOUT } from '$lib/config';
import { ApiError, NetworkError } from './errors';

interface RequestOptions {
	method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	body?: unknown;
	params?: Record<string, string | undefined>;
	signal?: AbortSignal;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
	const url = new URL(`${API_BASE_URL}/api/${API_VERSION}${path}`);

	if (options.params) {
		for (const [key, value] of Object.entries(options.params)) {
			if (value !== undefined) url.searchParams.set(key, value);
		}
	}

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
	const signal = options.signal ?? controller.signal;

	try {
		const response = await fetch(url, {
			method: options.method ?? 'GET',
			headers: { 'content-type': 'application/json' },
			body: options.body ? JSON.stringify(options.body) : undefined,
			signal
		});

		if (!response.ok) {
			const body = await response.json().catch(() => ({}));
			throw new ApiError(
				body.message ?? response.statusText,
				response.status,
				body.code,
				body.details
			);
		}

		if (response.status === 204) return undefined as T;
		return response.json();
	} catch (err) {
		if (err instanceof ApiError) throw err;
		throw new NetworkError(err);
	} finally {
		clearTimeout(timeoutId);
	}
}

export const api = {
	get: <T>(path: string, opts?: RequestOptions) => request<T>(path, { ...opts, method: 'GET' }),
	post: <T>(path: string, body?: unknown, opts?: RequestOptions) =>
		request<T>(path, { ...opts, method: 'POST', body }),
	put: <T>(path: string, body?: unknown, opts?: RequestOptions) =>
		request<T>(path, { ...opts, method: 'PUT', body }),
	patch: <T>(path: string, body?: unknown, opts?: RequestOptions) =>
		request<T>(path, { ...opts, method: 'PATCH', body }),
	delete: <T>(path: string, opts?: RequestOptions) =>
		request<T>(path, { ...opts, method: 'DELETE' })
};
