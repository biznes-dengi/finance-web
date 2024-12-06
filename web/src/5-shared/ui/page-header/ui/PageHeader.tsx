import {useNavigate} from 'react-router-dom';
import {Box, Button, ButtonType, Icon} from '@shared/ui';
import {PageHeaderProps} from '../types/PageHeader.types.ts';
import {cn} from '@shared/lib';

/** если есть возможность прокинуть backPath - лучше так и сделать */

export function PageHeader(props: PageHeaderProps) {
	const {title, description, subDescription, handleBackButtonClick, backPath, withBackButton = true, className} = props;

	const navigate = useNavigate();

	function onBackButtonClick() {
		if (handleBackButtonClick) return handleBackButtonClick();

		/** navigate(-1) не сработает, если страницу открыли в новой вкладке -> history.length = 0 */
		backPath ? navigate(backPath) : navigate(-1);
	}

	return (
		<div role='page-header' className={cn('mb-6 flex w-full flex-col items-start gap-2 px-4 pt-4', className)}>
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
			{title && <Box className='text-3xl font-bold'>{title}</Box>}
			{description && <div className='font-medium'>{description}</div>}
			{subDescription && <div className='text-sm font-light text-primary-grey'>{subDescription}</div>}
		</div>
	);
}
