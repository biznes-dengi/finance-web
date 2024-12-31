export type SelectInCardProps<TValue> = {
	value: TValue;
	onChange: (value: TValue) => void;
	options: readonly {name: string; value: TValue}[];
	isLoading?: boolean;
	title: string;
};
