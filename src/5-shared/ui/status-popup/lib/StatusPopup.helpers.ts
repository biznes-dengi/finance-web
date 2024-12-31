export const statusDuration = 1500;

export class StatusPopupHelpers {
	static runAfterStatusPopup(fn: () => void) {
		setTimeout(fn, statusDuration + 500);
	}
}
