import {Link} from 'react-router-dom';
import {APP_PATH, APP_TEXT} from '@shared/config';

export function PageNotFound() {
	return (
		<div className='bg-red-300'>
			<h1>{APP_TEXT.pageNotFound}</h1>
			<Link to={APP_PATH.root} className='bg-green-600'>
				{APP_TEXT.goBackHome}
			</Link>
		</div>
	);
}
