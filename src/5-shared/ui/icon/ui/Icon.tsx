import {ICON_MAP} from '../config/Icon.config.tsx';
import {IconProps} from '../types/Icon.types.ts';
import {cn} from '@shared/lib';

export function Icon({type, className, withBackground, ...rest}: IconProps) {
	const Icon = ICON_MAP[type];

	if (withBackground) {
		return (
			<div
				className={cn(
					'flex size-10 flex-shrink-0 items-center justify-center rounded-full  bg-secondary-violet text-primary-violet',
					className,
				)}
			>
				<Icon {...rest} className='' />
			</div>
		);
	}

	return <Icon className={cn('shrink-0', className)} {...rest} />;
}

/**
 * isAndroid isIos проверка, т.к. разнвые иконки
 * */

/**
 * 1. 16x16px: Этот размер часто используется для мелких иконок, таких как иконки действий или мелкие значки.
 * 2. 20x20px
 * 3. 24x24px: Этот размер также хорошо подходит для небольших иконок, которые должны быть немного крупнее, чем 16x16 пикселей.
 * 4. 32x32px: Более крупные иконки, которые должны быть более заметными и информативными, могут использовать этот размер.
 * 5. 48x48px: Этот размер подходит для более крупных иконок, которые должны привлекать внимание и быть основными элементами в интерфейсе.
 * 6. 64x64px: Для значительно крупных иконок, таких как логотипы или иконки, которые должны быть особенно привлекательными, можно использовать этот размер.
 * */
