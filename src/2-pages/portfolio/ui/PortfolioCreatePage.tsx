import {APP_PATH, APP_TEXT} from '@shared/constants';
import {Button, PageHeader, Spinner, StatusPopup, StatusPopupHelpers, TextField} from '@shared/ui';
import {portfolioNameMaxLength} from '@widgets/portfolio';
import {cn, useResponsive} from '@shared/lib';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const hints = ['Memecoins', 'Altcoins', 'AI agents', 'Long term', 'Flipping'];

export function PortfolioCreatePage() {
	const navigate = useNavigate();

	const [name, setName] = useState('');

	const [isCreatePortfolioSuccess, setIsCreatePortfolioSuccess] = useState(false);

	const {isMobile} = useResponsive();

	const isNameValidationPending = false;
	const isNameValidationSuccess = false;
	const isNameValidationError = false;

	const isCreatePortfolioPending = false;
	const isCreatePortfolioError = false;

	return (
		<>
			<PageHeader title={APP_TEXT.enterPortfolioName} backPath={APP_PATH.portfolio.list} />

			<div className='flex-grow px-4'>
				<TextField
					value={name}
					onChange={setName}
					description={
						<>
							{isNameValidationPending && (
								<div className='flex items-center gap-1'>
									<div className='text-primary-grey'>
										<Spinner className='size-3 text-primary-grey' />
									</div>
									<div>Checking name</div>
								</div>
							)}
							{isNameValidationSuccess && <div className='text-primary-violet'>Name is available</div>}
						</>
					}
					errorText={isNameValidationError && 'Such name already exists'}
					maxLength={portfolioNameMaxLength}
					placeholder={APP_TEXT.portfolioName}
				/>
				{!name && (
					<div className={cn('my-4 flex flex-wrap gap-2')}>
						{hints.map((hint, index) => (
							<Button
								type='secondary'
								key={index}
								className='w-fit px-2.5 py-1.5 text-sm'
								onClick={() => setName(hint)}
							>
								{hint}
							</Button>
						))}
					</div>
				)}
			</div>

			<div className={cn('p-4', !isMobile && 'w-96 self-center')}>
				<Button
					type='primary'
					onClick={() => {
						setIsCreatePortfolioSuccess(true);
						StatusPopupHelpers.runAfterStatusPopup(() => navigate(APP_PATH.portfolio.list));
					}}
					disabled={!name || isNameValidationPending || isNameValidationError}
					isPending={isCreatePortfolioPending}
				>
					{APP_TEXT.create}
				</Button>
			</div>

			<StatusPopup
				isOpen={isCreatePortfolioSuccess}
				status='success'
				statusTextKey='createPortfolioSuccess'
				statusTextProps={{name}}
			/>
			<StatusPopup isOpen={isCreatePortfolioError} status='error' statusTextKey='createPortfolioError' />
		</>
	);
}
