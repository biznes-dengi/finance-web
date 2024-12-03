import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {TAppFilter} from '@shared/types';
import {goalApi} from './goal.api.ts';
import {
	CreatePayload,
	createResponseScheme,
	DeletePayload,
	EditPayload,
	MutationFundGoalPayload,
	TransferPayload,
	TSavingPaged,
} from './goal.types.ts';
import {APP_PATH, TRANSACTION_TYPE} from '@shared/constants';
import {useNavigate} from 'react-router-dom';
import {getGoalDetailsPath} from '@shared/constants/appPath.constant.ts';
import {authModel} from '@entities/auth';

function useBoardSavingsId() {
	const authUser = authModel.useAuthUser();

	const {data} = useQuery({
		queryKey: ['board-savings-id'],
		queryFn: () => goalApi.fetchBoardSavingsId(authUser!.id),
		enabled: !!authUser,
	});

	return data;
}

function useTotalBalance() {
	const boardSavingId = useBoardSavingsId();

	const {data, isFetching} = useQuery({
		queryKey: ['board-savings-balance'],
		queryFn: () => goalApi.fetchBoardSavingsBalance(boardSavingId),
		enabled: !!boardSavingId,
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
		items: data?.items,
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

	const navigate = useNavigate();

	const {mutate, isPending, isError, isSuccess} = useMutation({
		mutationKey: ['transfer-goal'],
		mutationFn: (payload: CreatePayload) => {
			return goalApi.createGoal({boardSavingId, payload});
		},
		onSuccess: (data) => {
			setTimeout(() => navigate(getGoalDetailsPath(createResponseScheme.parse(data).id)), 2500);
		},
		onError: () => {
			setTimeout(() => navigate(APP_PATH.home), 2500);
		},
	});

	return {
		create: mutate,
		isCreatePending: isPending,
		isCreateSuccess: isSuccess,
		isCreateError: isError,
	};
}

function useDetails(id: any) {
	const boardSavingId = useBoardSavingsId();

	const {data} = useQuery({
		queryKey: ['goal-details'],
		queryFn: () => goalApi.fetchDetails({boardSavingId, id}),
		enabled: !!boardSavingId,
	});

	return {goalDetails: data};
}

function useGoalTransactions(id: any) {
	const boardSavingId = useBoardSavingsId();

	const filter = {pageNumber: 0};

	const {data, isFetching} = useQuery({
		queryKey: ['goal-transactions'],
		queryFn: () => goalApi.fetchGoalTransactions({filter, boardSavingId, id}),
		enabled: !!boardSavingId,
	});

	return {
		items: data?.items,
		hasNext: data?.hasNext,
		isItemsLoading: isFetching,
	};
}

function useEdit() {
	const boardSavingId = useBoardSavingsId();

	const queryClient = useQueryClient();

	const {mutate, isPending, isError, isSuccess} = useMutation({
		mutationKey: ['edit-goal'],
		mutationFn: ({goalId, payload}: {goalId?: string; payload: EditPayload}) => {
			return goalApi.editGoal({boardSavingId, goalId, payload});
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({queryKey: ['goal-details']});
		},
	});

	return {
		editGoal: mutate,
		isEditPending: isPending,
		isEditSuccess: isSuccess,
		isEditError: isError,
	};
}

function useDelete() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const boardSavingId = useBoardSavingsId();

	const {mutate, isPending, isError, isSuccess} = useMutation({
		mutationKey: ['delete-goal'],
		mutationFn: (payload: DeletePayload) => {
			return goalApi.deleteGoal({boardSavingId, id: payload.id});
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({queryKey: ['goal-items']});
		},
		onSettled: () => {
			// TODO goal has been deleted successfully drawer
			navigate(APP_PATH.home);
		},
	});

	return {
		deleteGoal: mutate,
		isDeletePending: isPending,
		isDeleteSuccess: isSuccess,
		isDeleteError: isError,
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
	useDetails,
	useGoalTransactions,
	useEdit,
	useDelete,
};
