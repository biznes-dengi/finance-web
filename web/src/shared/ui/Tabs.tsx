import {Tab} from '@headlessui/react';
import {Fragment, ReactElement, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {cn} from '@shared/lib';
import {APP_PATH} from '@shared/config';

export type TabConfig = {
	label: string;
	path: (typeof APP_PATH)[keyof typeof APP_PATH];
};

type Props = {
	tabConfigs: TabConfig[];
	tabContentList?: ReactElement[];
	value?: number;
	className?: string;
	isOutsideCard?: boolean;
};

export function Tabs(props: Props) {
	const {tabConfigs, tabContentList, value, className, isOutsideCard} = props;

	const [tabValue, setTabValue] = useState(0);

	const navigate = useNavigate();

	function handleTabSelect(index: number) {
		!value && setTabValue(index);

		const tabConfig = tabConfigs[index];

		tabConfig?.path && navigate(tabConfig.path);
	}

	return (
		<div role='tabs-wrapper' className={cn('bg-[#EDEFF2]', className, isOutsideCard && 'bg-transparent')}>
			<Tab.Group selectedIndex={value || tabValue} onChange={handleTabSelect}>
				<Tab.List>
					{tabConfigs.map(({label}, index) => {
						return (
							<Tab as={Fragment} key={label + index}>
								{({selected}) => (
									<button
										role='tab'
										className={cn(
											'px-4 py-1 outline-none',
											index + 1 !== tabConfigs.length && 'mr-3',
											selected ? 'rounded-2xl bg-white text-black' : 'text-primary-grey',
										)}
									>
										{label}
									</button>
								)}
							</Tab>
						);
					})}
				</Tab.List>
				{!!tabContentList?.length && (
					<Tab.Panels>
						{tabContentList.map((TabContent, index) => (
							<Tab.Panel key={index}>{TabContent}</Tab.Panel>
						))}
					</Tab.Panels>
				)}
			</Tab.Group>
		</div>
	);
}
