import {QueryClientProvider} from '@app/providers/QueryClientProvider.tsx';
import {RouterProvider} from '@app/providers/RouterProvider.tsx';

export function AppProvider() {
	return (
		<QueryClientProvider>
			<RouterProvider />
		</QueryClientProvider>
	);
}
