import {useMutation, useQuery} from '@tanstack/react-query';
import {TAppFilter} from '@shared/types';
import {savingApi} from './saving.api.ts';
import {MutationFundGoalPayload, TSavingPaged} from './saving.types.ts';
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
		queryKey: ['saving-items', filter],
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

export const savingModel = {
	useItems,
	useTotalBalance,
	useFundGoal,
};
