import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from '@headlessui/react';
import {Box, Icon, Item} from '@shared/ui';
import {Fragment, ReactNode} from 'react';
import Drawer from '@mui/material/Drawer';
import {cn, styleElement} from '@shared/lib';

// Работает, когда value = {name: string; value: any}

// potential problems
//  * close hover aint working
//  * клик в любом месте закрывает drawer
//  запихнуть listbox в <Drawer></Drawer> и все делать через ref

export function AccessibleSelectInCard({
	value,
	onChange,
	options,
}: {
	value: {name: string; value: any};
	onChange: any;
	options: {name: string; value: any}[];
}) {
	return (
		<Listbox value={value} onChange={onChange}>
			{({open}) => (
				<>
					<ListboxButton className='flex w-fit cursor-pointer items-center text-sm font-medium text-primary-grey hover:cursor-pointer'>
						{value.name}
						<div className='ml-1 size-4'>{Icon.chevronDown}</div>
					</ListboxButton>

					<Dialog isOpen={open}>
						{!open &&
							options.map((option: any, index: any) => (
								<Item
									key={index}
									name={option.name}
									isNameText
									rightNode={value.value === option.value && styleElement(Icon.check, 'size-5 text-primary-violet')}
								/>
							))}

						<ListboxOptions as='div' className='rounded-2xl bg-white p-1'>
							{options.map((option: any, index: any) => (
								<ListboxOption key={index} value={option} as={Fragment}>
									{({focus, selected}) => (
										<Item
											name={option.name}
											// сраный кейс когда два выделения одного цвета
											// когда уже заселекчено и ты долгим тапом выделяешь другой
											// hover
											// когда уходишь с активного, убирается цвет
											// className={cn(focus && !selected && 'bg-light-grey')}
											className={cn(
												selected && focus
													? 'bg-secondary-violet'
													: focus
													? 'bg-light-grey'
													: selected
													? 'bg-secondary-violet'
													: '',
											)}
											rightNode={selected && styleElement(Icon.check, 'size-5 text-primary-violet')}
											isNameText
										/>
									)}
								</ListboxOption>
							))}
						</ListboxOptions>
					</Dialog>
				</>
			)}
		</Listbox>
	);
}

export function Dialog(props: {isOpen: boolean; onClose?: () => void; children: ReactNode}) {
	const {children, isOpen, onClose} = props;

	return (
		<Drawer
			anchor='bottom'
			open={isOpen}
			onClose={onClose}
			PaperProps={{className: 'rounded-t-2xl'}}
			transitionDuration={200}
		>
			<Box className='flex flex-col bg-light-grey px-6 py-4'>
				<Box className='flex items-center justify-between' baseMarginBottom>
					<div />
					<Box className='text-xl font-medium'>Savings</Box>
					<div
						className='flex h-7 w-7 items-center justify-center duration-300 hover:cursor-pointer hover:rounded-full hover:bg-secondary-grey'
						onClick={onClose}
					>
						<div className='h-6 w-6'>{Icon.x}</div>
					</div>
				</Box>

				{children}
			</Box>
		</Drawer>
	);
}
