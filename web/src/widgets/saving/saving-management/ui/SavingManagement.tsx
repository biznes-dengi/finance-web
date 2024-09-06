import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {Box, Button, Item, List, SelectInCard} from '@shared/ui';

import {buttonConfigs, savingStateOptions, type TSavingStateValue} from '../config/savingManagement.config.ts';
import {savingModel} from '@entities/saving';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {getQueryString, isEmpty, isEqual, parseQueryString, textHelpers} from '@shared/lib';

const defaultFilter = {
	state: null as TSavingStateValue,
	userId: 1,
};
type TFilter = typeof defaultFilter;

export function SavingManagement() {
	const location = useLocation();

	let filtersFromURL = parseQueryString<TFilter>(location.search || '');

	if (!filtersFromURL.state) {
		filtersFromURL = {...filtersFromURL, state: defaultFilter.state};
	}

	const [filter, setFilter] = useState<TFilter>(isEmpty(filtersFromURL) ? defaultFilter : filtersFromURL);

	const {data} = savingModel.useItems(filter);

	const navigate = useNavigate();

	useEffect(() => {
		if (isEqual(filtersFromURL, filter)) return;

		const path = location.pathname + getQueryString(filter);
		navigate(path, {replace: true});
	}, [filter]);

	return (
		<Box isCard>
			<Box basePadding className='pb-0'>
				<Box className='flex justify-between pb-4'>
					<Box>
						<Box className='mb-1 text-3xl font-semibold'>{textHelpers.getAmountWithCurrency(950, '$')}</Box>
						<Box className='text-sm font-light text-primary-grey'>{APP_TEXT.accumulation}</Box>
					</Box>
					<div role='saving-icon' className='h-10 w-10 rounded-xl bg-secondary-grey' />
				</Box>

				<Box className='flex justify-between'>
					{buttonConfigs.map((buttonConfig) => (
						<Button
							type={buttonConfig.type}
							key={buttonConfig.name}
							icon={buttonConfig.icon}
							onClick={buttonConfig.onClick}
						>
							{buttonConfig.name}
						</Button>
					))}
				</Box>
			</Box>

			<Box basePaddingX className='py-3'>
				<SelectInCard<TSavingStateValue>
					value={filter.state}
					onChange={(value) => setFilter({...filter, state: value})}
					options={savingStateOptions}
				/>
			</Box>

			<List
				rows={data}
				renderRow={(row) => (
					<Item
						icon={<div className='border-2 border-primary-violet bg-secondary-grey' />}
						name={row.title}
						description={textHelpers.getRatio(row.amount, row.targetAmount, row.currencySymbol || '$')}
						onClick={(navigate) => navigate(APP_PATH.goalDetails)}
					/>
				)}
			/>
		</Box>
	);
}
