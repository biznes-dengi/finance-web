import {DependencyList, useEffect} from 'react';

type UseKeyClickProps = {
	key: 'Enter';
	onKeyDown: () => void;
	onKeyUp: () => void;
	deps: DependencyList;
};

export function useKeyClick({key, onKeyDown, onKeyUp, deps}: UseKeyClickProps) {
	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === key) {
				onKeyDown();
			}
		}

		function handleKeyUp(event: KeyboardEvent) {
			if (event.key === key) {
				onKeyUp();
			}
		}

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('keyup', handleKeyUp);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
		};
	}, [...deps]);
}
