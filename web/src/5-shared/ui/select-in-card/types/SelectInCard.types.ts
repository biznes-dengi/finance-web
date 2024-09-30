export type Props<TValue> = {
	value: TValue;
	onChange: (value: TValue) => void;
	options: readonly {name: string; value: TValue}[];
};
