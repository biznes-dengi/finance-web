export class DateService {
	public value: Date;

	constructor(date?: Date) {
		this.value = date ? date : new Date();
	}

	mutate() {
		// mutate this.value
		return this;
	}

	getLocalDateString() {
		return this.value
			.toLocaleDateString('ru-RU', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			})
			.replace(' г.', '');
	}

	getPayloadDateFormat() {
		return this.value.toISOString().split('.')[0]; // Убираем миллисекунды и таймзону;
	}
}
