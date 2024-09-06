import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {getQueryString, isEmpty, isEqual, parseQueryString} from '@shared/lib';
import {type TAppFilter} from '@shared/types';

type TProps<TFilter> = {
	defaultFilter: TFilter;
	shouldSyncFilterWithURL?: boolean;
};

export function useFilter<TFilter extends TAppFilter>(props: TProps<TFilter>) {
	const {defaultFilter, shouldSyncFilterWithURL = true} = props;

	const location = useLocation();
	const navigate = useNavigate();

	const filterFromURL = parseQueryString<TFilter>(location.search);

	const initialFilter = !shouldSyncFilterWithURL || isEmpty(filterFromURL) ? defaultFilter : filterFromURL;
	const [filter, setFilter] = useState<TFilter>(initialFilter);

	useEffect(() => {
		if (isEqual(filterFromURL, filter) || !shouldSyncFilterWithURL) return;

		const pathWithFilter = location.pathname + getQueryString(filter);
		navigate(pathWithFilter, {replace: true});
	}, [filter]);

	return {filter, setFilter};
}
