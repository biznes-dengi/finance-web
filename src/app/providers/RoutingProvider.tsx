import {ReactNode} from 'react';
import {BrowserRouter} from 'react-router-dom';

export function RoutingProvider({children}: {children: ReactNode}) {
	return <BrowserRouter>{children}</BrowserRouter>;
}
