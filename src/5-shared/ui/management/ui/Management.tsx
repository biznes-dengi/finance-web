import {ManagementProps} from '../type/Management.types.ts';
import {Card, List, LoadingWrapper} from '@shared/ui';
import {TextHelpers} from '@shared/lib';
import {APP_TEXT, CURRENCY_SYMBOL} from '@shared/constants';

export function Management<ListItem>(props: ManagementProps<ListItem>) {
	const {isLoading, totalBalance, buttons, listTitle, listItems, renderListItem, hasNextListPage, fetchNextListPage} =
		props;

	return (
		<Card>
			<div className='flex justify-between p-4'>
				<div className='flex flex-col gap-1.5'>
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
					<LoadingWrapper isLoading={isLoading} className='mb-1 h-[14px] w-16'>
						<span className='text-sm font-light text-primary-grey'>{APP_TEXT.totalBalance}</span>
					</LoadingWrapper>
				</div>

				<LoadingWrapper isLoading={isLoading} className='mb-1 size-10 rounded-xl'>
					<div className='ml-2 flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-200' />
				</LoadingWrapper>
			</div>

			<div className='flex justify-between px-4 pb-2 pt-1'>{buttons}</div>

			<div className='px-4 py-3 text-sm font-medium text-primary-grey'>
				<LoadingWrapper isLoading={isLoading} className='my-0.5 h-4 w-10'>
					{listTitle}
				</LoadingWrapper>
			</div>

			<List
				emptyTextKey='goals'
				isLoading={isLoading}
				items={listItems}
				renderItem={renderListItem}
				hasNextPage={hasNextListPage}
				fetchNextPage={fetchNextListPage}
			/>
		</Card>
	);
}
