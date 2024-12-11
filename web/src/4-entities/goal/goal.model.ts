import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {GoalApi} from './goal.api.ts';
import {type InitialData, type MutationProps, type Props} from './goal.types.ts';
import {AuthModel} from '@entities/auth';
import {APP_PATH, TRANSACTION_TYPE} from '@shared/constants';
import {runAfterStatusPopup} from '@shared/ui';

/**
 * начиная с useTotalBalance добавить goal в return {}, для специфичности, а иначе можно просто возвращать useQuery
 * */

export class GoalModel {
	static useItems(props: Props['useItems']) {
		const {filter} = props;

		const {boardGoalId, isBoardGoalIdLoading} = this.useBoardGoalId();

		const {data, isFetching} = useQuery({
			queryKey: ['goal-item-list', filter],
			queryFn: () => {
				return GoalApi.fetchItemList({
					params: {boardGoalId: boardGoalId!},
					payload: filter,
				});
			},
			enabled: !!boardGoalId,
			initialData: {} as InitialData['useItems'],
		});

		return {
			goals: data?.items,
			isGoalsLoading: isFetching || isBoardGoalIdLoading,
			hasNext: data?.hasNext,
		};
	}

	static useItemDetails(props: Props['useItemDetails']) {
		const {id} = props;

		const {boardGoalId, isBoardGoalIdLoading} = this.useBoardGoalId();

		const {data, isFetching} = useQuery({
			queryKey: [`goal-details-${id}`],
			queryFn: () => {
				return GoalApi.fetchItemDetails({
					params: {boardGoalId: boardGoalId!, id: id!},
				});
			},
			enabled: !!boardGoalId && !!id,
		});

		return {
			goalDetails: data,
			isGoalDetailsLoading: isFetching || isBoardGoalIdLoading,
		};
	}

	static useItemTransactions(props: Props['useItemTransactions']) {
		const {id, filter} = props;

		const {boardGoalId} = this.useBoardGoalId();

		const {data, isFetching} = useQuery({
			queryKey: [`goal-transactions-${id}`, filter],
			queryFn: () => {
				return GoalApi.fetchItemTransactions({
					params: {boardGoalId: boardGoalId!, id},
					payload: filter,
				});
			},
			enabled: !!boardGoalId,
		});

		return {
			goalTransactions: data?.items,
			isGoalTransactionsLoading: isFetching,
			hasNext: data?.hasNext,
		};
	}

	static useTotalBalance() {
		const {boardGoalId, isBoardGoalIdLoading} = this.useBoardGoalId();

		const {data, isFetching} = useQuery({
			queryKey: ['goal-total-balance'],
			queryFn: () => GoalApi.fetchTotalBalance(boardGoalId!),
			enabled: !!boardGoalId,
		});

		return {
			totalBalance: data,
			isTotalBalanceLoading: isFetching || isBoardGoalIdLoading,
		};
	}

	private static useBoardGoalId() {
		const {authUser, isAuthUserLoading} = AuthModel.useAuthUser();

		const {data, isFetching} = useQuery({
			queryKey: ['board-goal-id'],
			queryFn: () => GoalApi.fetchBoardGoalId(authUser!.id),
			enabled: !!authUser,
		});

		return {
			boardGoalId: data,
			isBoardGoalIdLoading: isFetching || isAuthUserLoading,
		};
	}

	static useCreateItem() {
		const {boardGoalId} = this.useBoardGoalId();

		const navigate = useNavigate();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['goal-create'],
			mutationFn: (props: MutationProps['useCreateItem']) => {
				return GoalApi.createItem({
					params: {boardGoalId: boardGoalId!},
					payload: props.payload,
				});
			},
			onSuccess: (data) => {
				runAfterStatusPopup(() => {
					navigate(APP_PATH.goal.getItemDetailsPath(data.id));
				});
			},
			onError: () => {
				runAfterStatusPopup(() => {
					navigate(APP_PATH.goalList);
				});
			},
		});

		return {
			createItem: mutate,
			isCreateItemLoading: isPending,
			isCreateItemSuccess: isSuccess,
			isCreateItemError: isError,
		};
	}

	static useUpdateItem() {
		const {boardGoalId} = this.useBoardGoalId();

		const queryClient = useQueryClient();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['edit-goal'],
			mutationFn: (props: MutationProps['useUpdateItem']) => {
				if (!props.params.id) return Promise.reject('No goal id');

				return GoalApi.updateItem({
					params: {...props.params, boardGoalId: boardGoalId!},
					payload: props.payload,
				});
			},
			onSuccess: (data: any) => {
				void queryClient.invalidateQueries({queryKey: [`goal-details-${data.id}`]});
			},
		});

		return {
			updateGoal: mutate,
			isUpdateGoalLoading: isPending,
			isUpdateGoalSuccess: isSuccess,
			isUpdateGoalError: isError,
		};
	}

	static useDeleteItem() {
		const queryClient = useQueryClient();

		const navigate = useNavigate();

		const {boardGoalId} = this.useBoardGoalId();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['goal-delete'],
			mutationFn: (props: MutationProps['useDeleteItem']) => {
				if (!props.params.id) return Promise.reject('No goal id');

				return GoalApi.deleteItem({
					params: {...props.params, boardGoalId: boardGoalId!},
				});
			},
			onSuccess: () => {
				runAfterStatusPopup(() => {
					void queryClient.invalidateQueries({queryKey: ['goal-items']});
					navigate(APP_PATH.goalList);
				});
			},
		});

		return {
			deleteGoal: mutate,
			isDeleteGoalLoading: isPending,
			isDeleteGoalSuccess: isSuccess,
			isDeleteGoalError: isError,
		};
	}

	static useDeposit() {
		const {boardGoalId} = this.useBoardGoalId();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['goal-deposit-money'],
			mutationFn: (props: MutationProps['useDeposit']) => {
				if (!props.params.id) return Promise.reject('No goal id');

				return GoalApi.deposit({
					params: {...props.params, boardGoalId: boardGoalId!},
					payload: {...props.payload, type: TRANSACTION_TYPE.DEPOSIT},
				});
			},
		});

		return {
			deposit: mutate,
			isDepositLoading: isPending,
			isDepositSuccess: isSuccess,
			isDepositError: isError,
		};
	}

	static useWithdraw() {
		const {boardGoalId} = this.useBoardGoalId();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['goal-withdraw-money'],
			mutationFn: (props: MutationProps['useWithdraw']) => {
				if (!props.params.id) return Promise.reject('No goal id');

				return GoalApi.withdraw({
					params: {...props.params, boardGoalId: boardGoalId!},
					payload: {...props.payload, type: TRANSACTION_TYPE.WITHDRAW},
				});
			},
		});

		return {
			withdraw: mutate,
			isWithdrawLoading: isPending,
			isWithdrawSuccess: isSuccess,
			isWithdrawError: isError,
		};
	}

	static useTransfer() {
		const {boardGoalId} = this.useBoardGoalId();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['goal-transfer-money'],
			mutationFn: (props: MutationProps['useTransfer']) => {
				return GoalApi.transfer({
					params: {boardGoalId: boardGoalId!},
					payload: props.payload,
				});
			},
		});

		return {
			transfer: mutate,
			isTransferLoading: isPending,
			isTransferSuccess: isSuccess,
			isTransferError: isError,
		};
	}
}
