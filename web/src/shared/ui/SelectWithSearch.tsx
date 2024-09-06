import {useState} from 'react';

import {Box, Item, TextField} from '@shared/ui';

import {APP_TEXT} from '@shared/constants';
import {isNumber} from '@shared/lib';
import {CURRENCY} from '@shared/constants';

type Props = {
	options?: {
		name: string;
		description: string;
		value: CURRENCY;
	}[];
	fetchOptions?: () => void;
	onChange: (value: CURRENCY) => void;
	value: CURRENCY | null;
	withMultipleSelection?: boolean;
};

export function SelectWithSearch(props: Props) {
	const {options, onChange, value, withMultipleSelection} = props;

	const initialOptions = options?.map((option) => ({
		...option,
		checked: isNumber(option.value) && option.value === value,
	}));

	const filteredOptions = !initialOptions?.filter((option) => option.checked).length
		? initialOptions?.map((option, index) => (index === 0 ? {...option, checked: true} : option))
		: initialOptions;

	const [selectOptions, setSelectOptions] = useState(filteredOptions || []);
	const [search, setSearch] = useState('');

	function handleOptionClick(value: CURRENCY) {
		const updatedOptions = selectOptions.map((selectOption) => {
			if (selectOption.value === value) {
				return {...selectOption, checked: true};
			}
			return {...selectOption, checked: false};
		});

		setSelectOptions(updatedOptions);
		onChange(value);
	}

	return (
		<>
			<Box baseMarginBottom>
				<TextField value={search} onChange={setSearch} placeholder={APP_TEXT.search} isSearch />
			</Box>

			<Box isCard>
				{selectOptions
					.filter((option) =>
						search.length ? (option.name + option.description).toLowerCase().includes(search.toLowerCase()) : true,
					)
					.map((option) => (
						<Item
							key={option.name}
							name={option.name}
							description={option.description}
							icon={<div className={'bg-primary-grey'} />}
							onClick={() => handleOptionClick(option.value)}
							checked={option.checked}
							withMultipleSelection={withMultipleSelection}
						/>
					))}
			</Box>
		</>
	);
}
