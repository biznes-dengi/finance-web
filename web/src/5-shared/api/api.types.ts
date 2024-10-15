export type TApiData = Record<string, string | number | boolean | undefined>;

export type HttpClientMethodProps = {
	url: string;
	data?: TApiData;
	abortSignal?: AbortSignal;
};

export type TApiMethodProps = Omit<HttpClientMethodProps, 'url'>;
