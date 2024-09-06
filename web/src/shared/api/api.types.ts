export type Filter = Record<string, unknown>;

export type HttpClientMethodProps = {
	url: string;
	filter?: Filter;
	abortSignal?: AbortSignal;
};
