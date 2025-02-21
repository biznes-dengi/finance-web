import {ManagementProps} from '../type/Management.types.ts';
import {Button, Card, Icon, Item, List, LoadingWrapper, Popup, PopupHelpers, usePopupState} from '@shared/ui';
import {cn, TextHelpers} from '@shared/lib';
import {APP_TEXT, CURRENCY_SYMBOL} from '@shared/constants';

export function Management<ListItem>(props: ManagementProps<ListItem>) {
	const {
		isLoading,
		totalBalance,
		settingsConfigs,
		buttonConfigs,
		listTitle,
		listItems,
		renderListItem,
		hasNextListPage,
		fetchNextListPage,
		emptyListTextKey,
		isButtonsSpaceBetween,
	} = props;

	const {popupProps, openPopup, closePopup} = usePopupState();

	return (
		<>
			<Card>
				<div className='flex flex-col gap-1.5 p-4'>
					<div className='flex items-center justify-between'>
						<LoadingWrapper isLoading={isLoading} className='mb-1.5 mt-2 h-6 w-32'>
							{totalBalance &&
								(() => {
									const [int, float] = TextHelpers.getAmount(totalBalance.amount).split('.');
									return (
										<div>
											<span className='text-3xl font-[600]'>
												<span>{int}</span>
												{!float && <span> {CURRENCY_SYMBOL[totalBalance.currency]}</span>}
											</span>
											{float && (
												<span className='text-xl font-bold'>
													.{float} {CURRENCY_SYMBOL[totalBalance.currency]}
												</span>
											)}
										</div>
									);
								})()}
						</LoadingWrapper>

						{settingsConfigs && (
							<LoadingWrapper isLoading={isLoading} className='size-6 rounded-xl'>
								<Button
									type='icon'
									icon={
										<Icon
											type='settings'
											className={cn(popupProps.isOpen && 'text-primary-grey transition duration-200')}
										/>
									}
									onClick={openPopup}
								/>
							</LoadingWrapper>
						)}
					</div>
					<div className='text-sm font-light text-primary-grey'>
						<LoadingWrapper isLoading={isLoading} className='mb-1 h-[14px] w-16'>
							{APP_TEXT.totalBalance}
						</LoadingWrapper>
					</div>
				</div>

				<div className={cn('flex px-4 pb-2 pt-1', isButtonsSpaceBetween ? 'justify-between' : 'gap-2')}>
					{buttonConfigs.map(({name, ...restButtonConfig}, index) => (
						<Button key={index} isLoading={isLoading} {...restButtonConfig}>
							{name}
						</Button>
					))}
				</div>

				<div className='px-4 py-3 text-sm font-medium text-primary-grey'>
					<LoadingWrapper isLoading={isLoading} className='my-0.5 h-4 w-10'>
						{listTitle}
					</LoadingWrapper>
				</div>

				<List
					emptyTextKey={emptyListTextKey}
					isLoading={isLoading}
					items={listItems}
					renderItem={renderListItem}
					hasNextPage={hasNextListPage}
					fetchNextPage={fetchNextListPage}
				/>
			</Card>

			{settingsConfigs && (
				<Popup {...popupProps}>
					<div className='flex flex-col gap-4'>
						{settingsConfigs.map((settingsConfig, index) => (
							<List
								key={index}
								items={settingsConfig}
								renderItem={(settingConfig) => (
									<Item
										{...settingConfig}
										onClick={
											settingConfig.onClick
												? ({navigate}) => {
														closePopup();
														PopupHelpers.runAfterPopupClosed(() => settingConfig.onClick!({navigate}));
												  }
												: undefined
										}
									/>
								)}
							/>
						))}
					</div>
				</Popup>
			)}
		</>
	);
}
