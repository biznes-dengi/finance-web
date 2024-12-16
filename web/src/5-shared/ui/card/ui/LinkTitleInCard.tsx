import {useNavigate} from 'react-router-dom';
import {type LinkTitleInCardProps} from '../types/Card.types';
import {Icon} from '@shared/ui';

export function LinkTitleInCard(props: LinkTitleInCardProps) {
	const {title, path} = props;

	const navigate = useNavigate();

	return (
		<div className='flex w-fit cursor-pointer items-center gap-1' onClick={() => navigate(path)}>
			<div>{title}</div>
			<div>
				<Icon type='chevronRight' className='size-2.5 text-primary-grey' />
			</div>
		</div>
	);
}
