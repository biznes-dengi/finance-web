import {cloneElement} from 'react';
import {useNavigate} from 'react-router-dom';

import {Box, Button, ButtonType, Icon} from '@shared/ui';

type Props = {
	title?: string;
	backPath?: string;
	handleBackButtonClick?: () => void;
};

export function PageHeader(props: Props) {
	const {title, handleBackButtonClick, backPath} = props;

	const navigate = useNavigate();

	function onBackButtonClick() {
		if (handleBackButtonClick) return handleBackButtonClick();

		/** navigate(-1) не сработает, если страницу открыли в новой вкладке -> history.length = 0 */
		backPath ? navigate(backPath) : navigate(-1);
	}

	return (
		<div role='page-header' className='w-full'>
			<Button type={ButtonType.icon} onClick={onBackButtonClick} className='p-4 text-black'>
				{cloneElement(Icon.backButton, {className: 'h-6 w-6'})}
			</Button>
			{title && (
				<Box basePaddingX className='text-4xl font-bold'>
					{title}
				</Box>
			)}
		</div>
	);
}
