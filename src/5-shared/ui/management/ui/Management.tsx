import {ManagementProps} from '../type/Management.types.ts';
import {Button, Card, Icon, List, LoadingWrapper} from '@shared/ui';
import {cn, TextHelpers} from '@shared/lib';
import {CURRENCY_SYMBOL} from '@shared/constants';

export function Management<ListItem>(props: ManagementProps<ListItem>) {
	const {
		isLoading,
		totalBalance,
		totalBalanceDescription,
		buttonConfigs,
		listTitle,
		listItems,
		renderListItem,
		hasNextListPage,
		fetchNextListPage,
		emptyListTextKey,
		isButtonsSpaceBetween,
	} = props;

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

						<LoadingWrapper isLoading={isLoading} className='my-0.5 h-4 w-10'>
							<div className='flex items-center gap-1 rounded-2xl bg-light-grey p-2 text-sm '>
								<div>24h</div>
								<div>
									<Icon type='selectChevron' className='size-[10px]' />
								</div>
							</div>
						</LoadingWrapper>
					</div>

					<div className='text-sm font-light text-primary-grey'>
						<LoadingWrapper isLoading={isLoading} className='mb-1 h-[14px] w-16'>
							{totalBalanceDescription}
						</LoadingWrapper>
					</div>
				</div>

				<div className={cn('flex px-4 pb-2', isButtonsSpaceBetween ? 'justify-between' : 'gap-2')}>
					{buttonConfigs.map(({name, ...restButtonConfig}, index) => (
						<Button key={index} isLoading={isLoading} {...restButtonConfig}>
							{name}
						</Button>
					))}
				</div>

				<div className='flex justify-between px-4 py-3 text-sm font-medium text-primary-grey'>
					<LoadingWrapper isLoading={isLoading} className='my-0.5 h-4 w-10'>
						<div>{listTitle}</div>
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
		</>
	);
}
