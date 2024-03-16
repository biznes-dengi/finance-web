import {HomePage} from '../ui/HomePage.tsx';

import {APP_PATH} from '@shared/constants';
import {withRouteGuard} from '@shared/lib';

export const homePageRoute = {
	path: APP_PATH.root,
	element: withRouteGuard({page: <HomePage />}),
};
