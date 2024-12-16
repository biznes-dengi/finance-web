import {useState} from 'react';
import {Card, Icon, Item, TextField} from '@shared/ui';
import {APP_TEXT, CURRENCY} from '@shared/constants';
import {cn, isNumber} from '@shared/lib';
import {Props} from '../types/SelectWithSearch.types.ts';

// cпроектирован под select currency

export function SelectWithSearch(props: Props) {
	const {options, onChange, value} = props;

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
			<div className='mb-4'>
				<TextField value={search} onChange={setSearch} placeholder={APP_TEXT.search} isSearch />
			</div>

			<Card>
				{selectOptions
					.filter((option) =>
						search.length ? (option.name + option.description).toLowerCase().includes(search.toLowerCase()) : true,
					)
					.map((option) => (
						<Item
							key={option.name}
							name={option.name}
							description={option.description}
							image={<div className={'size-10 rounded-full bg-primary-grey'} />}
							onClick={() => handleOptionClick(option.value)}
							statusIcon={option.checked && <Icon type='check' className='size-3' />}
							className={cn(option.checked && 'bg-light-grey')}
						/>
					))}
			</Card>
		</>
	);
}
