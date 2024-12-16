import {Skeleton as MuiSkeleton} from '@mui/material';
import {cn} from '@shared/lib';

export function PreloadSkeleton(props: {isCircular?: boolean; className?: string}) {
	const {isCircular, className} = props;

	// Функция для извлечения значения ширины или высоты из className (формат w-[*px], h-[*px], size-[*px])
	const extractCustomDimension = (className: string, type: 'w' | 'h' | 'size') => {
		const match = className.match(new RegExp(`${type}-\\[(\\d*\\.?\\d+)px\\]`)); // ищем паттерн типа w-[16px], h-[15.5px]
		return match ? parseFloat(match[1]) : undefined; // извлекаем значение, поддерживая числа с точкой
	};

	// Функция для извлечения стандартного значения width или height (формат w-*, h-*, size-*)
	const extractTailwindDimension = (className: string, type: 'w' | 'h' | 'size') => {
		const match = className.match(new RegExp(`${type}-(\\d*\\.?\\d+)`)); // паттерн для дробных значений
		return match ? parseFloat(match[1]) * 4 : undefined; // умножаем на 4 для стандартных классов
	};

	// Функция для фильтрации классов, исключая w-*, h-* и size-*
	const filterClassNames = (className: string) => {
		return className
			.split(' ') // разбиваем className на массив классов
			.filter(
				(cls) =>
					!/^w-\d+(\.\d+)?|^h-\d+(\.\d+)?|^size-\d+(\.\d+)?|^w-\[\d*\.?\d+px\]|^h-\[\d*\.?\d+px\]|^size-\[\d*\.?\d+px\]/.test(
						cls,
					),
			) // исключаем классы w-*, h-*, size-* и w-[*px], h-[*px], size-[*px]
			.join(' '); // собираем обратно в строку
	};

	// Извлекаем размеры из className, сначала ищем кастомные размеры (w-[*px], h-[*px], size-[*px]), затем стандартные классы
	let width = className ? extractCustomDimension(className, 'w') : undefined;
	let height = className ? extractCustomDimension(className, 'h') : undefined;
	const size = className ? extractCustomDimension(className, 'size') : undefined;

	// Если в className есть стандартные классы w-*, h-* или size-*, то они могут переопределить кастомные размеры
	if (width === undefined) {
		width = className ? extractTailwindDimension(className, 'w') : undefined;
	}

	if (height === undefined) {
		height = className ? extractTailwindDimension(className, 'h') : undefined;
	}

	// Если в className есть класс size-*, то задаем одинаковые width и height
	if (size === undefined) {
		const sizeFromClass = className ? extractTailwindDimension(className, 'size') : undefined;
		if (sizeFromClass !== undefined) {
			width = sizeFromClass;
			height = sizeFromClass;
		}
	} else {
		width = size;
		height = size;
	}

	// Фильтруем className, исключая w-*, h-* и size-* и кастомные классы w-[*px], h-[*px], size-[*px]
	const filteredClassName = className ? filterClassNames(className) : '';

	return (
		<MuiSkeleton
			animation='wave'
			variant={isCircular ? 'circular' : 'rectangular'}
			width={width}
			height={height}
			className={cn('rounded-2xl', filteredClassName)}
		/>
	);
}
