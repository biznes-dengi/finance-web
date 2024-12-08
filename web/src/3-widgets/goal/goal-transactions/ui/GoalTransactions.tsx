import {useNavigate, useParams} from 'react-router-dom';
import {GoalModel} from '@entities/goal';
import {APP_TEXT, CURRENCY, CURRENCY_MAP, TRANSACTION_TYPE} from '@shared/constants';
import {Card, Item, List} from '@shared/ui';
import {DateService, textHelpers} from '@shared/lib';
import {FaChevronRight} from 'react-icons/fa6';

export function getTransactionName(row: any) {
	if (!row) return;

	const type = row.type as TRANSACTION_TYPE;

	if (type === TRANSACTION_TYPE.DEPOSIT) {
		return APP_TEXT.fund;
	}
	if (type === TRANSACTION_TYPE.WITHDRAW) {
		return APP_TEXT.withdraw;
	}
	if (type === TRANSACTION_TYPE.TRANSFER) {
		return `${row.fromGoalName} → ${row.toGoalName}`;
	}
}
export function getTransactionRightName(type: TRANSACTION_TYPE, amount: number, currency: CURRENCY) {
	if (type === TRANSACTION_TYPE.DEPOSIT) {
		return `+${textHelpers.getAmount(amount)} ${CURRENCY_MAP[currency].symbol}`;
	}
	if (type === TRANSACTION_TYPE.WITHDRAW) {
		return `-${textHelpers.getAmount(amount)} ${CURRENCY_MAP[currency].symbol}`;
	}
	if (type === TRANSACTION_TYPE.TRANSFER) {
		return `+${textHelpers.getAmount(amount)} ${CURRENCY_MAP[currency].symbol}`;
	}
}

export function GoalTransactions() {
	const navigate = useNavigate();
	const {goalId} = useParams();
	const {items, isItemsLoading} = GoalModel.useItemTransactions(goalId, {pageNumber: 0});
	const {item: details} = GoalModel.useItemDetails({id: Number(goalId)});

	return (
		<Card
			titleInCard={
				<div className='flex items-center gap-1'>
					<div>{APP_TEXT.transactions}</div>
					<div>
						<FaChevronRight className='size-2.5 text-primary-grey' />
					</div>
				</div>
			}
			// rightTitle={<Button onClick={() => navigate(getGoalTransactionsPath(goalId))}>{APP_TEXT.seeAll}</Button>}
			withTopSpace
		>
			{items && (
				<List
					isLoading={isItemsLoading}
					rows={[items[0], items[1], items[2]]}
					renderRow={(row) => {
						if (!row) return null;
						return (
							<Item
								image={<div className='size-10 rounded-full bg-secondary-violet' />}
								name={getTransactionName(row)}
								description={new DateService(new Date(row.date as string)).getLocalDateString()}
								rightName={
									details &&
									getTransactionRightName(
										row.type,
										(row.amount ?? row.toGoalAmount) as number,
										details.balance.currency,
									)
								}
								// onClick={() => alert('go to transaction details')}
							/>
						);
					}}
				/>
			)}
		</Card>
	);
}
