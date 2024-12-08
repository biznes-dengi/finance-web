import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {GoalApi} from './goal.api.ts';
import {type InitialData, type MutationProps, type Props} from './goal.types.ts';
import {AuthModel} from '@entities/auth';
import {APP_PATH, getGoalDetailsPath, TRANSACTION_TYPE} from '@shared/constants';

export class GoalModel {
	static useItemList(props: Props['useItemList']) {
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
			initialData: {} as InitialData['useItemList'],
		});

		return {
			itemList: data?.items,
			hasNext: data?.hasNext,
			isItemListLoading: isFetching || isBoardGoalIdLoading,
		};
	}

	static useItemDetails(props: Props['useItemDetails']) {
		const {id} = props;

		const {boardGoalId} = this.useBoardGoalId();

		const {data} = useQuery({
			queryKey: ['goal-item-details'],
			queryFn: () => {
				return GoalApi.fetchItemDetails({
					params: {boardGoalId: boardGoalId!, id},
				});
			},
			enabled: !!boardGoalId,
		});

		return {
			itemDetails: data,
		};
	}

	static useItemTransactions(props: Props['useItemTransactions']) {
		const {id, filter} = props;

		const {boardGoalId} = this.useBoardGoalId();

		const {data, isFetching} = useQuery({
			queryKey: ['goal-transactions', filter],
			queryFn: () => {
				return GoalApi.fetchItemTransactions({
					params: {boardGoalId: boardGoalId!, id},
					payload: filter,
				});
			},
			enabled: !!boardGoalId,
		});

		return {
			items: data?.items,
			hasNext: data?.hasNext,
			isItemsLoading: isFetching,
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
				setTimeout(() => navigate(getGoalDetailsPath(data.id)), 2500);
			},
			onError: () => {
				setTimeout(() => navigate(APP_PATH.home), 2500);
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
				return GoalApi.updateItem({
					params: {...props.params, boardGoalId: boardGoalId!},
					payload: props.payload,
				});
			},
			onSuccess: () => {
				void queryClient.invalidateQueries({queryKey: ['goal-details']});
			},
		});

		return {
			updateItem: mutate,
			isUpdateItemLoading: isPending,
			isUpdateItemSuccess: isSuccess,
			isUpdateItemError: isError,
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
				void queryClient.invalidateQueries({queryKey: ['goal-items']});
				navigate(APP_PATH.goalList);
			},
		});

		return {
			deleteItem: mutate,
			isDeleteItemLoading: isPending,
			isDeleteItemSuccess: isSuccess,
			isDeleteItemError: isError,
		};
	}

	static useDeposit() {
		const {boardGoalId} = this.useBoardGoalId();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['goal-deposit-money'],
			mutationFn: (props: MutationProps['useDeposit']) => {
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
