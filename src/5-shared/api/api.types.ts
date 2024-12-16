export type Payload = Record<string, string | number | boolean | undefined | null>;

export type HttpClientParams = {
	get: {
		url: string;
		data?: Payload;
		abortSignal?: AbortSignal;
	};

	post: {
		url: string;
		data: Payload;
		abortSignal?: AbortSignal;
	};

	put: {
		url: string;
		data: Payload;
		abortSignal?: AbortSignal;
	};

	delete: {
		url: string;
		abortSignal?: AbortSignal;
	};
};
