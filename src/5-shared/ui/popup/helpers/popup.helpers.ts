export class PopupHelpers {
	static runAfterPopupClosed(fn: () => void) {
		setTimeout(fn, 250);
	}
}
