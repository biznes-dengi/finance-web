import {QueryClientProvider} from './QueryClientProvider.tsx';
import {RoutingProvider} from './RoutingProvider.tsx';

export function AppProvider() {
	return (
		<QueryClientProvider>
			<RoutingProvider />
		</QueryClientProvider>
	);
}
