import {APP_PATH, APP_TEXT} from '@shared/constants';
import {
	Button,
	PageHeader,
	Popup,
	PopupHelpers,
	Spinner,
	StatusPopup,
	StatusPopupHelpers,
	TextField,
	usePopupState,
} from '@shared/ui';
import {portfolioNameMaxLength} from '@widgets/portfolio';
import {cn, useResponsive} from '@shared/lib';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const hints = ['Memecoins', 'Altcoins', 'AI agents', 'Long term', 'Flipping'];

const emojiConfigs = [
	{value: '🦄'},
	{value: '🕊'},
	{value: '🐳'},
	{value: '🐹'},
	{value: '🐶'},
	{value: '🦊'},
	{value: '🐯'},
	{value: '🐸'},
	{value: '🦋'},
	{value: '🏎'},
	{value: '🐽'},
	{value: '😎'},
	{value: '✊🏼'},
	{value: '💅'},
	{value: '🌸'},
	{value: '☀️'},
	{value: '⛔️'},
	{value: '😈'},
	{value: '💀'},
	{value: '🧠'},
	{value: '🎉'},
].map((config, index) => ({
	...config,
	id: index,
}));

export function PortfolioCreatePage() {
	const navigate = useNavigate();

	const [name, setName] = useState('');

	const [isCreatePortfolioSuccess, setIsCreatePortfolioSuccess] = useState(false);
	const [selectedEmojiConfig, setSelectedEmojiConfig] = useState(emojiConfigs[0]);
	const [inPopupEmojiConfig, setInPopupEmojiConfig] = useState(selectedEmojiConfig);

	const {isMobile} = useResponsive();

	const {popupProps, openPopup, closePopup} = usePopupState();

	useEffect(() => {
		if (popupProps.isOpen) return;

		setInPopupEmojiConfig(emojiConfigs[0]);
	}, [popupProps.isOpen]);

	const isNameValidationPending = false;
	const isNameValidationSuccess = false;
	const isNameValidationError = false;

	const isCreatePortfolioPending = false;
	const isCreatePortfolioError = false;

	return (
		<>
			<PageHeader title={APP_TEXT.createPortfolio} backPath={APP_PATH.portfolio.list} />

			<div className='flex flex-grow flex-col gap-4 px-4'>
				<div className='flex flex-col items-center gap-1 self-center' onClick={() => openPopup()}>
					<div className='relative flex size-20 items-center justify-center rounded-full bg-secondary-violet text-2xl'>
						<span>{selectedEmojiConfig.value}</span>
					</div>
					<div className='text-sm text-primary-violet'>{APP_TEXT.setImage}</div>
				</div>

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
					<div className='flex flex-wrap gap-2'>
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

			<Popup {...popupProps} title={APP_TEXT.setImage}>
				<div className='flex flex-col gap-4'>
					<div className='flex size-20 items-center justify-center self-center rounded-full bg-secondary-violet text-2xl'>
						<span>{inPopupEmojiConfig.value}</span>
					</div>

					<div className='flex flex-wrap gap-2 text-xl'>
						{emojiConfigs.map((emojiConfig) => (
							<div
								key={emojiConfig.id}
								className={cn(
									'size-10 p-1 text-center transition duration-200 active:scale-95 active:brightness-90',
									inPopupEmojiConfig.id === emojiConfig.id && 'rounded-full bg-secondary-grey',
								)}
								onClick={() => setInPopupEmojiConfig(emojiConfig)}
							>
								{emojiConfig.value}
							</div>
						))}
					</div>

					<Button
						type='primary'
						onClick={() => {
							closePopup();
							PopupHelpers.runAfterPopupClosed(() => setSelectedEmojiConfig(inPopupEmojiConfig));
						}}
					>
						{APP_TEXT.save}
					</Button>
				</div>
			</Popup>

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
