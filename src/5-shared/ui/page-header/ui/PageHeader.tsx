import {useNavigate} from 'react-router-dom';
import {PageHeaderProps} from '../types/PageHeader.types.ts';
import {Button, ButtonType, Icon} from '@shared/ui';
import {cn, isNumber} from '@shared/lib';

/** navigate(-1) не сработает, если страницу открыли в новой вкладке -> history.length = 0 */
/** поэтому если есть возможность прокинуть backPath - лучше так и сделать */

export function PageHeader(props: PageHeaderProps) {
	const {
		title,
		description,
		subDescription,
		handleBackButtonClick,
		backPath,
		withBackButton = true,
		withNoSpace,
		stepsCount,
		activeStepIndex,
		appleTitle,
		className,
	} = props;

	const navigate = useNavigate();

	function onBackButtonClick() {
		if (handleBackButtonClick) return handleBackButtonClick();
		backPath ? navigate(backPath) : navigate(-1);
	}

	return (
		<div
			role='page-header'
			className={cn('mb-6 w-full pt-4', isNumber(stepsCount) && 'pt-2', withNoSpace && 'p-0', className)}
		>
			{isNumber(stepsCount) && isNumber(activeStepIndex) && (
				<div className='mb-3 px-2 flex w-full gap-1'>
					{Array.from({length: 3}).map((item, index) => (
						<div
							key={cn(item as any, index)}
							className={cn(
								'h-0.5 w-full rounded-3xl bg-primary-grey opacity-40',
								index <= activeStepIndex && 'opacity-1 bg-black',
							)}
						/>
					))}
				</div>
			)}

			<div className={cn('px-4 flex flex-col items-start gap-2', withNoSpace && 'p-0')}>
				{appleTitle ? (
					<div className={cn('flex w-full items-center justify-between')}>
						{withBackButton && (
							<Button
								type={ButtonType.icon}
								icon={
									<div className='flex items-center justify-center'>
										<Icon type='backButton' className='size-5' />
									</div>
								}
								onClick={onBackButtonClick}
								isOnlyIcon
							/>
						)}
						<div className='absolute left-1/2 -translate-x-1/2 transform font-bold'>{appleTitle}</div>
					</div>
				) : (
					withBackButton && (
						<Button
							type={ButtonType.icon}
							icon={
								<div className='flex items-center justify-center'>
									<Icon type='backButton' className='size-5' />
								</div>
							}
							onClick={onBackButtonClick}
							isOnlyIcon
						/>
					)
				)}

				{title && <div className='text-3xl font-bold'>{title}</div>}
				{description && <div className='font-medium'>{description}</div>}
				{subDescription && <div className='text-sm font-light text-primary-grey'>{subDescription}</div>}
			</div>
		</div>
	);
}
