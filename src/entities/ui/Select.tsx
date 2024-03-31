import {useState} from 'react';

import {ListItem} from './ListItem.tsx';
import {Box, Button, Card, TextField} from '@shared/ui';

import {APP_TEXT, CURRENCY} from '@shared/constants';
import {cn, isNumber} from '@shared/lib';

type Props = {
	options?: {
		name: string;
		description: string;
		value: CURRENCY;
	}[];
	fetchOptions?: () => void;
	onChange: (value: CURRENCY) => void;
	value: CURRENCY | null;
};

export function Select(props: Props) {
	const {options, onChange, value} = props;

	const initialOptions = options?.map((option) => ({
		...option,
		checked: isNumber(option.value) && option.value === value,
	}));

	const [selectOptions, setSelectOptions] = useState(initialOptions || []);
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
			<Box withBaseBottom>
				<TextField value={search} onChange={setSearch} placeholder={APP_TEXT.search} isSearch />
			</Box>

			<Card>
				{selectOptions
					.filter((option) =>
						search.length ? (option.name + option.description).toLowerCase().includes(search.toLowerCase()) : true,
					)
					.map((option) => (
						<Button
							key={option.name}
							onClick={() => handleOptionClick(option.value)}
							className={cn(option.checked && 'bg-secondary-violet')}
						>
							<ListItem {...option} />
						</Button>
					))}
			</Card>
		</>
	);
}
