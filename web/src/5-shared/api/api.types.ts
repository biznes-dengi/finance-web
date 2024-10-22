export type TApiData = Record<string, string | number | boolean | undefined>;

// TODO: when post | put -> data required
export type HttpClientMethodProps = {
	url: string;
	data?: TApiData;
	abortSignal?: AbortSignal;
};

export type TApiMethodProps = Omit<HttpClientMethodProps, 'url'>;
