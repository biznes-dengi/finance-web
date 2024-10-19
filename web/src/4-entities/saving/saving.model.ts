import {useMutation, useQuery} from '@tanstack/react-query';
import {TAppFilter} from '@shared/types';
import {savingApi} from './saving.api.ts';
import {MutationFundGoalPayload, TransferPayload, TSavingPaged} from './saving.types.ts';
import {TRANSACTION_TYPE} from '@shared/constants';

function useBoardSavingsId() {
	const {data} = useQuery({
		queryKey: ['board-savings-id'],
		queryFn: () => savingApi.fetchBoardSavingsId(1),
	});

	return data;
}

function useTotalBalance() {
	const {data, isFetching} = useQuery({
		queryKey: ['board-savings-balance'],
		queryFn: () => savingApi.fetchBoardSavingsBalance(1),
	});

	return {totalBalance: data, isTotalBalanceFetching: isFetching};
}

function useItems(filter?: TAppFilter) {
	const boardSavingId = useBoardSavingsId();

	const {data, isFetching} = useQuery({
		queryKey: ['goal-items', filter],
		queryFn: () => savingApi.fetchItems({filter, boardSavingId}),
		enabled: !!boardSavingId,
		initialData: {} as TSavingPaged,
	});

	return {
		items: data?.data,
		hasNext: data?.hasNext,
		isItemsFetching: isFetching,
	};
}

function useFundGoal() {
	const boardSavingId = useBoardSavingsId();

	const {mutate, isPending, isError, isSuccess} = useMutation({
		mutationKey: ['fund-goal'],
		mutationFn: (payload: MutationFundGoalPayload) => {
			const {id, ...restPayload} = payload;
			return savingApi.fundGoal({
				id,
				boardSavingId,
				payload: {...restPayload, type: TRANSACTION_TYPE.deposit},
			});
		},
	});

	return {
		fundGoal: mutate,
		isFundGoalPending: isPending,
		isFundGoalSuccess: isSuccess,
		isFundGoalError: isError,
	};
}

function useWithdrawGoal() {
	const boardSavingId = useBoardSavingsId();

	const {mutate, isPending, isError, isSuccess} = useMutation({
		mutationKey: ['withdraw-goal'],
		mutationFn: (payload: MutationFundGoalPayload) => {
			const {id, ...restPayload} = payload;
			return savingApi.withdrawGoal({
				id,
				boardSavingId,
				payload: {...restPayload, type: TRANSACTION_TYPE.withdraw},
			});
		},
	});

	return {
		withdrawGoal: mutate,
		isWithdrawGoalPending: isPending,
		isWithdrawGoalSuccess: isSuccess,
		isWithdrawGoalError: isError,
	};
}

function useTransfer() {
	const boardSavingId = useBoardSavingsId();

	const {mutate, isPending, isError, isSuccess} = useMutation({
		mutationKey: ['transfer-goal'],
		mutationFn: (payload: TransferPayload) => {
			return savingApi.transferGoal({boardSavingId, payload});
		},
	});

	return {
		transfer: mutate,
		isTransferPending: isPending,
		isTransferSuccess: isSuccess,
		isTransferError: isError,
	};
}

// rename to useFund, useWithdraw
export const savingModel = {
	useItems,
	useTotalBalance,
	useFundGoal,
	useWithdrawGoal,
	useTransfer,
};
