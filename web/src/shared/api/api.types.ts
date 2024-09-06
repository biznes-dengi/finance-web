import {TAppFilter} from '@shared/types';

export type HttpClientMethodProps = {
	url: string;
	filter?: TAppFilter;
	abortSignal?: AbortSignal;
};

export type DefaultApiMethodProps = Omit<HttpClientMethodProps, 'url'>;
