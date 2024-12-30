import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {GoalApi} from './goal.api.ts';
import {type MutationProps, type Props} from './goal.types.ts';
import {AuthModel} from '@entities/auth';
import {APP_PATH, TRANSACTION_TYPE} from '@shared/constants';
import {StatusPopupHelpers} from '@shared/ui';

export class GoalModel {
	static useItems(props: Props['useItems']) {
		const {filter} = props;

		const {boardGoalId, isBoardGoalIdLoading} = this.useBoardGoalId();

		// when is loading data undefined in BLL, but null in UI
		const {data, isLoading, fetchNextPage, hasNextPage} = useInfiniteQuery({
			queryKey: ['goal-item-list', filter],

			queryFn: ({pageParam}: {pageParam?: number}) => {
				return GoalApi.fetchItems({
					params: {boardGoalId: boardGoalId!},
					payload: {...filter, pageNumber: pageParam},
				});
			},

			initialPageParam: 0,

			getNextPageParam: (lastPage) => lastPage && lastPage.info.pageNumber + 1,

			enabled: !!boardGoalId,
		});

		const filteredPages = data?.pages.filter((page) => page !== null);

		return {
			// Сливаем элементы всех страниц. В момент загрузки goals = null
			goals: filteredPages?.length ? filteredPages.flatMap((page) => page && page.items) : null,
			isGoalsLoading: isLoading || isBoardGoalIdLoading,
			hasNextGoalsPage: hasNextPage,
			fetchNextGoalsPage: fetchNextPage,
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

		const {boardGoalId, isBoardGoalIdLoading} = this.useBoardGoalId();

		const {data, isLoading, fetchNextPage, hasNextPage} = useInfiniteQuery({
			queryKey: [`goal-transactions-${id}`, filter],

			queryFn: ({pageParam}: {pageParam?: number}) => {
				return GoalApi.fetchItemTransactions({
					params: {boardGoalId: boardGoalId!, id},
					payload: {...filter, pageNumber: pageParam},
				});
			},

			initialPageParam: 0,

			getNextPageParam: (lastPage) => lastPage && lastPage.info.pageNumber + 1,

			enabled: !!boardGoalId,
		});

		const filteredPages = data?.pages.filter((page) => page !== null);

		return {
			goalTransactions: filteredPages?.length ? filteredPages.flatMap((page) => page && page.items) : null,
			isGoalTransactionsLoading: isLoading || isBoardGoalIdLoading,
			hasNextGoalTransactionsPage: hasNextPage,
			fetchNextGoalTransactionsPage: fetchNextPage,
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
			goalTotalBalance: data,
			isGoalTotalBalanceLoading: isFetching || isBoardGoalIdLoading,
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

			onSuccess: (goal) => {
				if (!goal) {
					console.error('Goal data is missing');
					return;
				}

				StatusPopupHelpers.runAfterStatusPopup(() => {
					navigate(APP_PATH.goal.getItemDetailsPath(goal.id));
				});
			},

			onError: () => {
				StatusPopupHelpers.runAfterStatusPopup(() => {
					navigate(APP_PATH.goalList);
				});
			},
		});

		return {
			createGoal: mutate,
			isCreateGoalLoading: isPending,
			isCreateGoalSuccess: isSuccess,
			isCreateGoalError: isError,
		};
	}

	static useUpdateItem() {
		const {boardGoalId} = this.useBoardGoalId();

		const queryClient = useQueryClient();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['edit-goal'],

			mutationFn: (props: MutationProps['useUpdateItem']) => {
				return GoalApi.updateItem({
					params: {...props.params, boardGoalId: boardGoalId!},
					payload: props.payload,
				});
			},

			onSuccess: (data: any) => {
				StatusPopupHelpers.runAfterStatusPopup(() => {
					void queryClient.invalidateQueries({queryKey: [`goal-details-${data.id}`]});
				});
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
				return GoalApi.deleteItem({
					params: {...props.params, boardGoalId: boardGoalId!},
				});
			},

			onSuccess: () => {
				StatusPopupHelpers.runAfterStatusPopup(() => {
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

	static useFund(props: Props['useFund'] = {}) {
		const {isFromListPage = false} = props;

		const navigate = useNavigate();

		const {boardGoalId} = this.useBoardGoalId();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['goal-deposit-money'],

			mutationFn: (props: MutationProps['useFund']) => {
				return GoalApi.fundItem({
					params: {...props.params, boardGoalId: boardGoalId!},
					payload: {...props.payload, type: TRANSACTION_TYPE.DEPOSIT},
				});
			},

			onSettled: (goal) => {
				if (!goal) {
					console.error('Goal data is missing');
					return;
				}

				StatusPopupHelpers.runAfterStatusPopup(() => {
					navigate(isFromListPage ? APP_PATH.goalList : APP_PATH.goal.getItemDetailsPath(goal.id));
				});
			},
		});

		return {
			fundGoal: mutate,
			isFundGoalLoading: isPending,
			isFundGoalSuccess: isSuccess,
			isFundGoalError: isError,
		};
	}

	static useWithdraw(props: Props['useWithdraw'] = {}) {
		const {isFromListPage = false} = props;

		const navigate = useNavigate();

		const {boardGoalId} = this.useBoardGoalId();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['goal-withdraw-money'],

			mutationFn: (props: MutationProps['useWithdraw']) => {
				return GoalApi.withdrawItem({
					params: {...props.params, boardGoalId: boardGoalId!},
					payload: {...props.payload, type: TRANSACTION_TYPE.WITHDRAW},
				});
			},

			onSettled: (goal) => {
				if (!goal) {
					console.error('Goal data is missing');
					return;
				}

				StatusPopupHelpers.runAfterStatusPopup(() => {
					navigate(isFromListPage ? APP_PATH.goalList : APP_PATH.goal.getItemDetailsPath(goal.id));
				});
			},
		});

		return {
			withdrawGoal: mutate,
			isWithdrawGoalLoading: isPending,
			isWithdrawGoalSuccess: isSuccess,
			isWithdrawGoalError: isError,
		};
	}

	static useTransfer(props: Props['useTransfer'] = {}) {
		const {isFromListPage = false} = props;

		const navigate = useNavigate();

		const {boardGoalId} = this.useBoardGoalId();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['goal-transfer-money'],

			mutationFn: (props: MutationProps['useTransfer']) => {
				return GoalApi.transferItem({
					params: {boardGoalId: boardGoalId!},
					payload: props.payload,
				});
			},

			onSettled: (goal) => {
				if (!goal) {
					console.error('Goal data is missing');
					return;
				}

				StatusPopupHelpers.runAfterStatusPopup(() => {
					navigate(isFromListPage ? APP_PATH.goalList : APP_PATH.goal.getItemDetailsPath(goal.id));
				});
			},
		});

		return {
			transferGoal: mutate,
			isTransferGoalLoading: isPending,
			isTransferGoalSuccess: isSuccess,
			isTransferGoalError: isError,
		};
	}
}
