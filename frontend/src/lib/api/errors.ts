export class ApiError extends Error {
	constructor(
		message: string,
		public status: number,
		public code?: string,
		public details?: Record<string, string[]>
	) {
		super(message);
		this.name = 'ApiError';
	}
}

export class NetworkError extends Error {
	constructor(cause: unknown) {
		super('Network error');
		this.name = 'NetworkError';
		this.cause = cause;
	}
}

export class ValidationError extends Error {
	constructor(
		message: string,
		public fields: Record<string, string[]>
	) {
		super(message);
		this.name = 'ValidationError';
	}
}

export type AppError = ApiError | NetworkError | ValidationError;
