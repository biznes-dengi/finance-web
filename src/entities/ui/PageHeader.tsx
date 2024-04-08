import {NavigateFunction} from 'react-router-dom';

import {APP_ICON, Box, Button} from '@shared/ui';

import {cn} from '@shared/lib';

type Props = {
	title?: string;
	handleBackButtonClick?: () => void;
};

/** Make sticky */

export function PageHeader(props: Props) {
	const {title, handleBackButtonClick} = props;

	function onBackButtonClick({navigate}: {navigate: NavigateFunction}) {
		if (handleBackButtonClick) return handleBackButtonClick();

		navigate(-1);
	}

	return (
		<>
			<div className={cn('absolute top-0 z-10 px-4 pt-2')}>
				<Button onClick={onBackButtonClick} icon={<div className={cn('h-8 w-8')}>{APP_ICON.backButton}</div>} />
			</div>
			{title && (
				<Box withMediumVertical className={cn('text-4xl font-bold')}>
					{title}
				</Box>
			)}
		</>
	);
}
