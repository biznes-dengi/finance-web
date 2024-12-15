import {TextHelpers} from '@shared/lib';

export function getGoalProgressData(
	isItemDetailsLoading: boolean,
	itemDetails: any,
): {
	percentage: number;
	ratio: string;
	isCompleted: boolean;
} | null {
	if (isItemDetailsLoading || !itemDetails) return null;

	const {balance, targetAmount} = itemDetails;

	const percentage = Math.min(100, Math.floor((balance!.amount / (targetAmount as number)) * 100));
	const isCompleted = balance.amount >= targetAmount;

	const ratio = TextHelpers.getRatio(balance!.amount, targetAmount as number, balance?.currency);

	return {percentage, ratio, isCompleted};
}
