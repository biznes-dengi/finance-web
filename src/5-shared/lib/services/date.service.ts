import dayjs from 'dayjs';
import {isString} from '@shared/lib';

export class DateService {
	public value: Date;

	constructor(date?: Date | string) {
		if (!date) {
			this.value = new Date();
			return;
		}

		this.value = new Date(date);
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

	calculateTimeLeft() {
		const today = dayjs();
		const deadlineDate = dayjs(this.value);

		const diffInDays = deadlineDate.diff(today, 'day');
		const diffInMonths = deadlineDate.diff(today, 'month');
		const diffInYears = deadlineDate.diff(today, 'year');

		if (diffInDays < 30) {
			return this.formatTime(diffInDays, 'день', 'дня', 'дней');
		}

		if (diffInMonths < 12) {
			return this.formatTime(diffInMonths, 'мес.', 'мес.', 'мес.');
		}

		if (diffInMonths >= 12) {
			return this.formatTime(diffInYears, 'год', 'года', 'лет');
		}
	}

	// calculateTimeLeft() {
	// 	const today = dayjs();
	// 	const deadlineDate = dayjs(this.value);
	//
	// 	// Получаем разницу в днях (неправильно считает, с декабря 2024 по март 2025 diffInMonths = 2)
	// 	const diffInDays = deadlineDate.diff(today, 'day');
	// 	const diffInMonths = deadlineDate.diff(today, 'month');
	// 	const diffInYears = deadlineDate.diff(today, 'year');
	//
	// 	// Если разница менее 30 дней, выводим в днях
	// 	if (diffInDays < 30) {
	// 		return this.formatTime(diffInDays, 'день', 'дня', 'дней');
	// 	}
	//
	// 	// Если разница больше или равна 12 месяцам, выводим в годах
	// 	if (diffInYears >= 1) {
	// 		return this.formatTime(diffInYears, 'год', 'года', 'лет');
	// 	}
	//
	// 	// Если разница в месяцах меньше 12, но не достаточно для года, то мы проверяем количество месяцев с точностью до дней
	// 	const remainingMonths = deadlineDate.month() - today.month();
	// 	// const remainingYears = deadlineDate.year() - today.year();
	//
	// 	if (remainingMonths < 0) {
	// 		// return this.formatTime(diffInMonths + 12, 'месяц', 'месяца', 'месяцев');
	// 		return this.formatTime(diffInMonths + 12, 'мес.', 'мес.', 'мес.');
	// 	}
	//
	// 	// return this.formatTime(diffInMonths, 'месяц', 'месяца', 'месяцев');
	// 	return this.formatTime(diffInMonths, 'мес.', 'мес.', 'мес.');
	// }

	isEqualTo(date: Date | string): boolean {
		if (!this.value) return false;

		const comparisonDate = isString(date) ? new Date(date) : date;

		// Сравниваем только дату (игнорируем время)
		return dayjs(this.value).isSame(comparisonDate, 'day');
	}
}
