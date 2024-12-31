import {DependencyList, useEffect} from 'react';

type UseKeyClickProps = {
	key: 'Enter';
	onKeyDown?: () => void;
	onKeyUp?: () => void;
	deps?: DependencyList;
	disabled?: boolean;
};

export function useKeyClick({key, onKeyDown, onKeyUp, deps = [], disabled}: UseKeyClickProps) {
	useEffect(() => {
		if (disabled) return;

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === key) {
				onKeyDown?.();
			}
		}

		function handleKeyUp(event: KeyboardEvent) {
			if (event.key === key) {
				onKeyUp?.();
			}
		}

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('keyup', handleKeyUp);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
		};
	}, [...deps, onKeyDown, onKeyUp]);
}
