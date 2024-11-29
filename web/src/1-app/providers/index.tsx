import {QueryClientProvider} from '@app/providers/QueryClientProvider.tsx';
import {RouterProvider} from '@app/providers/RouterProvider.tsx';

export function AppProvider() {
	window.onload = function () {
		void screen.orientation.lock('portrait');
	};

	return (
		<QueryClientProvider>
			<RouterProvider />
		</QueryClientProvider>
	);
}
