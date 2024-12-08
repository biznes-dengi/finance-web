import {cloneElement} from 'react';
import {useNavigate} from 'react-router-dom';

import {Box, Button, ButtonType, Icon} from '@shared/ui';

type Props = {
	title?: string;
	backPath?: string;
	handleBackButtonClick?: () => void;
	withBackButton?: boolean;
};

/** если есть возможность прокинуть backPath - лучше так и сделать */

export function PageHeader(props: Props) {
	const {title, handleBackButtonClick, backPath, withBackButton = true} = props;

	const navigate = useNavigate();

	function onBackButtonClick() {
		if (handleBackButtonClick) return handleBackButtonClick();

		/** navigate(-1) не сработает, если страницу открыли в новой вкладке -> history.length = 0 */
		backPath ? navigate(backPath) : navigate(-1);
	}

	return (
		<div role='page-header' className='mb-6 w-full'>
			{withBackButton && (
				<Button
					type={ButtonType.icon}
					icon={
						<div className='flex items-center justify-center p-2 pl-0'>
							{cloneElement(Icon.backButton, {className: 'size-6 text-black'})}
						</div>
					}
					onClick={onBackButtonClick}
					isOnlyIcon
				/>
			)}
			{title && <Box className='text-3xl font-bold'>{title}</Box>}
		</div>
	);
}
