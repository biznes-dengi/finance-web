import {useMutation, useQuery} from '@tanstack/react-query';
import {TAppFilter} from '@shared/types';
import {goalApi} from './goal.api.ts';
import {CreatePayload, MutationFundGoalPayload, TransferPayload, TSavingPaged} from './goal.types.ts';
import {TRANSACTION_TYPE} from '@shared/constants';

function useBoardSavingsId() {
	const {data} = useQuery({
		queryKey: ['board-savings-id'],
		queryFn: () => goalApi.fetchBoardSavingsId(1),
	});

	return data;
}

function useTotalBalance() {
	const {data, isFetching} = useQuery({
		queryKey: ['board-savings-balance'],
		queryFn: () => goalApi.fetchBoardSavingsBalance(1),
	});

	return {totalBalance: data, isTotalBalanceFetching: isFetching};
}

function useItems(filter?: TAppFilter) {
	const boardSavingId = useBoardSavingsId();

	const {data, isFetching} = useQuery({
		queryKey: ['goal-items', filter],
		queryFn: () => goalApi.fetchItems({filter, boardSavingId}),
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
			return goalApi.fundGoal({
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
			return goalApi.withdrawGoal({
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
			return goalApi.transferGoal({boardSavingId, payload});
		},
	});

	return {
		transfer: mutate,
		isTransferPending: isPending,
		isTransferSuccess: isSuccess,
		isTransferError: isError,
	};
}

function useCreate() {
	const boardSavingId = useBoardSavingsId();

	const {mutate, isPending, isError, isSuccess} = useMutation({
		mutationKey: ['transfer-goal'],
		mutationFn: (payload: CreatePayload) => {
			return goalApi.createGoal({boardSavingId, payload});
		},
	});

	return {
		create: mutate,
		isCreatePending: isPending,
		isCreateSuccess: isSuccess,
		isCreateError: isError,
	};
}

// rename to useFund, useWithdraw
export const goalModel = {
	useItems,
	useTotalBalance,
	useFundGoal,
	useWithdrawGoal,
	useTransfer,
	useCreate,
};
