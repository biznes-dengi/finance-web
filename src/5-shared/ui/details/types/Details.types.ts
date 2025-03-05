import {ReactNode} from 'react';

export type DetailsProps = {
	detailsFields: {
		label: string;
		node: ReactNode;
	}[];
	isLoading: boolean;
};
