import dayjs from 'dayjs';
import {isString} from '@shared/lib';

export class DateService {
	public value: Date | undefined;

	constructor(date?: Date | string, skipTodayDate = false) {
		if (!date && !skipTodayDate) {
			this.value = new Date();
			return;
		}

		this.value = isString(date) ? new Date(date) : date;
	}

	getLocalDateString() {
		if (!this.value) return 'No date';

		return this.value
			.toLocaleDateString('ru-RU', {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
			})
			.replace(' г.', '');
	}

	getPayloadDateFormat() {
		if (!this.value) return null;

		return this.value.toISOString().split('.')[0]; // Убираем миллисекунды и таймзону;
	}

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

	isEqualTo(date: Date | string): boolean {
		if (!this.value) return false;

		const comparisonDate = isString(date) ? new Date(date) : date;

		// Сравниваем только дату (игнорируем время)
		return dayjs(this.value).isSame(comparisonDate, 'day');
	}
}
