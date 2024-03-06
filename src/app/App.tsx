import {AppProvider} from '@app/providers';
import {AppRouter} from '@app/router';

export function App() {
	return (
		<AppProvider>
			<AppRouter />
		</AppProvider>
	);
}
