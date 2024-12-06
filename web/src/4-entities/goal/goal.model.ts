import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {GoalApi} from './goal.api.ts';
import {CreatePayload, DeletePayload, EditPayload, MutationFundGoalPayload, TransferPayload} from './goal.types.ts';
import {authModel} from '@entities/auth';
import {AppFilter} from '@shared/types';
import {APP_PATH, TRANSACTION_TYPE, getGoalDetailsPath} from '@shared/constants';

// TODO:
//  rename to useFund, useWithdraw
//  static class

export class GoalModel {
	static useItems(filter?: AppFilter) {
		const {boardGoalId, isBoardGoalIdFetching} = this.useBoardGoalId();

		const {data, isFetching} = useQuery({
			queryKey: ['goal-items', filter],
			queryFn: () => GoalApi.fetchItems({filter, boardGoalId: boardGoalId!}),
			enabled: !!boardGoalId,
			initialData: {} as TSavingPaged,
		});

		return {
			items: data?.items,
			hasNext: data?.hasNext,
			isItemsFetching: isFetching || isBoardGoalIdFetching,
		};
	}

	static useDetails(id: any) {
		const {boardGoalId} = this.useBoardGoalId();

		const {data} = useQuery({
			queryKey: ['goal-details'],
			queryFn: () => GoalApi.fetchItem({boardGoalId, id}),
			enabled: !!boardGoalId,
		});

		return {goalDetails: data};
	}

	static useCreate() {
		const {boardGoalId} = this.useBoardGoalId();

		const navigate = useNavigate();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['transfer-goal'],
			mutationFn: (payload: CreatePayload) => {
				return GoalApi.createItem({boardGoalId: boardGoalId!, payload});
			},
			onSuccess: (data) => {
				setTimeout(() => navigate(getGoalDetailsPath(data.id)), 2500);
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

	// todo: updateItem
	static useEdit() {
		const {boardGoalId} = this.useBoardGoalId();

		const queryClient = useQueryClient();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['edit-goal'],
			mutationFn: ({goalId, payload}: {goalId: number; payload: EditPayload}) => {
				return GoalApi.updateItem({boardGoalId: boardGoalId!, id: goalId, payload});
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

	static useDelete() {
		const queryClient = useQueryClient();

		const navigate = useNavigate();

		const {boardGoalId} = this.useBoardGoalId();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['delete-goal'],
			mutationFn: (payload: DeletePayload) => {
				return GoalApi.deleteItem({boardGoalId: boardGoalId!, id: payload.id});
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

	static useGoalTransactions(id: any) {
		const {boardGoalId} = this.useBoardGoalId();

		const filter = {pageNumber: 0};

		const {data, isFetching} = useQuery({
			queryKey: ['goal-transactions'],
			queryFn: () => GoalApi.fetchItemTransactions({filter, boardGoalId: boardGoalId!, id}),
			enabled: !!boardGoalId,
		});

		return {
			items: data?.items,
			hasNext: data?.hasNext,
			isItemsLoading: isFetching,
		};
	}

	// TODO: useDeposit
	static useFundGoal() {
		const {boardGoalId} = this.useBoardGoalId();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['fund-goal'],
			mutationFn: (payload: MutationFundGoalPayload) => {
				const {id, ...restPayload} = payload;
				return GoalApi.depositMoney({
					id,
					boardGoalId: boardGoalId!,
					payload: {...restPayload, type: TRANSACTION_TYPE.DEPOSIT},
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

	static useWithdrawGoal() {
		const {boardGoalId} = this.useBoardGoalId();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['withdraw-goal'],
			mutationFn: (payload: MutationFundGoalPayload) => {
				const {id, ...restPayload} = payload;
				return GoalApi.withdrawMoney({
					id,
					boardGoalId: boardGoalId!,
					payload: {...restPayload, type: TRANSACTION_TYPE.WITHDRAW},
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

	static useTransfer() {
		const {boardGoalId} = this.useBoardGoalId();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['transfer-goal'],
			mutationFn: (payload: TransferPayload) => {
				return GoalApi.transferMoney({boardGoalId: boardGoalId!, payload});
			},
		});

		return {
			transfer: mutate,
			isTransferPending: isPending,
			isTransferSuccess: isSuccess,
			isTransferError: isError,
		};
	}

	static useTotalBalance() {
		const {boardGoalId, isBoardGoalIdFetching} = this.useBoardGoalId();

		const {data, isFetching} = useQuery({
			queryKey: ['goal-total-balance'],
			queryFn: () => GoalApi.fetchTotalBalance(boardGoalId!),
			enabled: !!boardGoalId,
		});

		return {
			totalBalance: data,
			isTotalBalanceFetching: isFetching || isBoardGoalIdFetching,
		};
	}

	private static useBoardGoalId() {
		const {authUser, isAuthUserFetching} = authModel.useAuthUser();

		const {data, isFetching} = useQuery({
			queryKey: ['board-goal-id'],
			queryFn: () => GoalApi.fetchBoardGoalId(authUser!.id),
			enabled: !!authUser,
		});

		return {
			boardGoalId: data,
			isBoardGoalIdFetching: isFetching || isAuthUserFetching,
		};
	}
}
