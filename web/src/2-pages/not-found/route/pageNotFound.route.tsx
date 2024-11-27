import {PageNotFound} from '../ui/PageNotFound.tsx';
import {APP_PATH} from '@shared/constants';

export const pageNotFoundRoute = {
	path: APP_PATH.pageNotFound,
	element: <PageNotFound />,
};
