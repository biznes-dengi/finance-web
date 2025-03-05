import {Card, LoadingWrapper} from '@shared/ui';
import {DetailsProps} from '../types/Details.types.ts';

export function Details({detailsFields, isLoading}: DetailsProps) {
	return (
		<Card>
			{detailsFields.map(({label, node}, index) => (
				<div className='flex justify-between p-4 text-sm' key={index}>
					<LoadingWrapper isLoading={isLoading} className='my-0.5 h-4 w-10'>
						<div className='font-medium text-primary-grey'>{label}</div>
					</LoadingWrapper>
					<LoadingWrapper isLoading={isLoading} className='my-0.5 h-4 w-10'>
						<div>{node}</div>
					</LoadingWrapper>
				</div>
			))}
		</Card>
	);
}

// type DetailsProps = {
// 	details: any;
// 	detailsFields: {
// 		label: string;
// 		key: string;
// 		type?: 'text' | 'custom';
// 		customNode?: ({details, value}: any) => ReactNode;
// 		customValue?: ({details}: any) => ReactNode;
// 		// handler: ({navigate}: {navigate: NavigateFunction}) => void;
// 	}[];
// 	isLoading: boolean;
// };
//
// function getDetailsFields<Details>({handlers}: any) {
// 	return [
// 		{
// 			label: 'name',
// 			key: 'name',
// 			type: 'custom',
// 			customNode: ({value}: any) => (
// 				<Button onClick={handlers.name} icon={<Icon type='edit' className='size-1' />} isOnlyIcon>
// 					{value}
// 				</Button>
// 			),
// 		},
// 		{
// 			label: 'name',
// 			key: 'name',
// 			type: 'button',
// 			customValue: ({details}: {details: Details}) => (
// 				<>
// 					{details?.targetAmount} {details && CURRENCY_SYMBOL[details.balance.currency]}
// 				</>
// 			),
// 		},
// 	] as DetailsProps['detailsFields'];
// }
//
// function Details({details, isLoading, detailsFields}: DetailsProps) {
// 	return detailsFields.map((detailsField, index) => (
// 		<div key={index} className='flex justify-between p-4 text-sm'>
// 			<div className='font-medium text-primary-grey'>{detailsField.label}</div>
//
// 			{detailsField.type === 'button' ? (
// 				<Button onClick={detailsField.handler} icon={<Icon type='edit' className='size-1' />} isOnlyIcon>
// 					{details?.[detailsField.key]}
// 				</Button>
// 			) : (
// 				details?.[detailsField.key]
// 			)}
// 		</div>
// 	));
// }
