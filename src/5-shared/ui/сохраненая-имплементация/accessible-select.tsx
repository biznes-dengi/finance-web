import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from '@headlessui/react';
import {Icon, Item} from '@shared/ui';
import {Fragment, ReactNode} from 'react';
import Drawer from '@mui/material/Drawer';
import {cn, styleElement, useResponsive} from '@shared/lib';

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
	const {isDesktop} = useResponsive();

	return (
		<Listbox value={value} onChange={onChange}>
			{({open}) => (
				<>
					<ListboxButton
						className={cn(
							'flex w-fit cursor-pointer items-center text-sm font-medium text-primary-grey',
							isDesktop && 'hover:cursor-pointer',
						)}
					>
						{value.name}
						<div className='ml-1 size-4'>
							<Icon type='selectChevron' />
						</div>
					</ListboxButton>

					<Dialog isOpen={open}>
						{!open &&
							options.map((option: any, index: any) => (
								<Item
									key={index}
									name={option.name}
									isNameText
									rightNode={
										value.value === option.value && styleElement(<>SuccessIcon</>, 'size-5 text-primary-violet')
									}
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
											rightNode={selected && styleElement(<>SuccessIcon</>, 'size-5 text-primary-violet')}
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

	const {isDesktop} = useResponsive();

	return (
		<Drawer
			anchor='bottom'
			open={isOpen}
			onClose={onClose}
			PaperProps={{className: 'rounded-t-2xl'}}
			transitionDuration={200}
		>
			<div className='flex flex-col bg-light-grey px-6 py-4'>
				<div className='mb-4 flex items-center justify-between'>
					<div />
					<div className='text-xl font-medium'>Goals</div>
					<div
						className={cn(
							'flex size-7 items-center justify-center duration-300',
							isDesktop && 'hover:cursor-pointer hover:rounded-full hover:bg-secondary-grey',
						)}
						onClick={onClose}
					>
						<div className='h-6 w-6'>X</div>
					</div>
				</div>

				{children}
			</div>
		</Drawer>
	);
}
