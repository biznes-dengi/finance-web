export const statusDuration = 1500;

export function runAfterStatusPopup(fn: () => void) {
	setTimeout(fn, statusDuration + 300);
}
