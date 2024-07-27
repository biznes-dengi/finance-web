import {useNavigate} from 'react-router-dom';

import {APP_ICON, Box, Button, BUTTON_TYPE} from '@shared/ui';

import {cn} from '@shared/lib';

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
			<Button onClick={onBackButtonClick} type={BUTTON_TYPE.icon} className='p-4'>
				{APP_ICON.backButton}
			</Button>
			{title && (
				<Box withBaseHorizontal withBaseTop className={cn('text-4xl font-bold')}>
					{title}
				</Box>
			)}
		</div>
	);
}
