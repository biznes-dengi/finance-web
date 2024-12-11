import dayjs from 'dayjs';
import {isString} from '@shared/lib';

export class DateService {
	public value: Date;

	constructor(date?: Date | string) {
		if (!date) {
			this.value = new Date();
			return;
		}

		this.value = isString(date) ? new Date(date) : date;
	}

	getLocalDateString() {
		return this.value
			.toLocaleDateString('ru-RU', {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
			})
			.replace(' г.', '');
	}

	getPayloadDateFormat() {
		return this.value.toISOString().split('.')[0]; // Убираем миллисекунды и таймзону;
	}

	// calculateDaysLeft() {
	// 	const today = dayjs();
	// 	const deadlineDate = dayjs(this.value);
	// 	return deadlineDate.diff(today, 'day');
	// }

	private formatTime(value: number, singular: string, dual: string, plural: string): string {
		const absValue = Math.abs(value);
		const lastDigit = absValue % 10;
		const secondLastDigit = Math.floor(absValue / 10) % 10;

		if (secondLastDigit === 1) {
			// Если вторая цифра 1, то это исключение (11, 111 и т.д.)
			return `${value} ${plural}`;
		}

		if (lastDigit === 1) {
			return `${value} ${singular}`;
		} else if (lastDigit >= 2 && lastDigit <= 4) {
			return `${value} ${dual}`;
		} else {
			return `${value} ${plural}`;
		}
	}
	calculateDaysLeft() {
		const today = dayjs();
		const deadlineDate = dayjs(this.value);

		const diffInDays = deadlineDate.diff(today, 'day');
		const diffInMonths = deadlineDate.diff(today, 'month');
		const diffInYears = deadlineDate.diff(today, 'year');

		if (diffInDays < 30) {
			return this.formatTime(diffInDays, 'день', 'дня', 'дней');
		}
		if (diffInMonths < 12) {
			return this.formatTime(diffInMonths, 'месяц', 'месяца', 'месяцев');
		}
		return this.formatTime(diffInYears, 'год', 'года', 'лет');
	}
}
