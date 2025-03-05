import {useState} from 'react';
import {walletNameMaxLength} from '@widgets/portfolio';
import {Details, PageHeader, TextEditButton} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';
import {checkIfTextChanged} from '@shared/lib';

export function PortfolioWalletEditPage() {
	const isLoading = false;

	const initialName = 'Metamask memes';
	const [name, setName] = useState<string>(initialName);

	const initialAddress = '0x8193921...2348H6lsk';
	const [address, setAddress] = useState<string>(initialAddress);

	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const detailsFields = [
		{
			label: APP_TEXT.name,
			node: (
				<TextEditButton
					entityName={APP_TEXT.name}
					maxLength={walletNameMaxLength}
					initialValue={initialName}
					value={name}
					onChange={setName}
					handleUpdate={() => setIsSuccess(true)}
					isChanged={checkIfTextChanged(initialName, name)}
					isPending={false}
					isSuccess={isSuccess}
					isError={false}
				>
					{name}
				</TextEditButton>
			),
		},
		{
			label: APP_TEXT.address,
			node: (
				<TextEditButton
					entityName={APP_TEXT.address}
					initialValue={initialAddress}
					value={address}
					onChange={setAddress}
					handleUpdate={() => setIsSuccess(true)}
					isChanged={checkIfTextChanged(initialAddress, address)}
					isPending={false}
					isSuccess={false}
					isError={isSuccess}
				>
					{address}
				</TextEditButton>
			),
		},
	];

	return (
		<>
			<PageHeader />

			<div className='flex flex-col gap-6 px-4 pb-6'>
				<Details detailsFields={detailsFields} isLoading={isLoading} />
			</div>
		</>
	);
}
