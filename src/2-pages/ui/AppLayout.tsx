import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {cn} from '@shared/lib';
import {Button, Card, Icon, Item, List, Popup, PopupHelpers, usePopupState} from '@shared/ui';
import {AuthModel} from '@entities/auth';
import {APP_PATH, APP_TEXT, CURRENCY, CURRENCY_CODE} from '@shared/constants';
import {ManagementSettingsConfigs} from '@shared/ui/management/type/Management.types.ts';
import {useState} from 'react';

export function AppLayout() {
	const isDesktop = false;

	return (
		<div
			role='list-page-layout'
			className={cn('mx-auto min-h-screen max-w-[33rem]', isDesktop ? 'flex justify-between px-6 py-8' : 'p-4')}
		>
			<AppHeader />

			{isDesktop && <AppSidebar />}

			<div role='app-content' className='w-full'>
				<AppTabs />

				<Outlet />
			</div>
		</div>
	);
}

const settingsConfigs = [
	[
		{
			name: APP_TEXT.connectedWallets,
			image: <Icon type='wallet' withBackground />,
			onClick: ({navigate}) => navigate(APP_PATH.portfolio.connectedWallets),
		},
		{
			name: APP_TEXT.currency,
			description: 'Coming soon',
			image: <Icon type='dollar' className='text-[17px]' withBackground />,
			rightNode: <div className='text-primary-grey'>{CURRENCY_CODE[CURRENCY.USD]}</div>,
		},
		{
			name: 'Hide balance',
			description: 'Coming soon',
			image: <Icon type='hide' className='text-[18px]' withBackground />,
			rightNode: 'switch',
		},
		{
			name: 'Include in total portfolio',
			description: 'Coming soon',
			image: <Icon type='portfolio' withBackground />,
			rightNode: 'switch',
		},
	],
	[
		{
			name: APP_TEXT.share + ' ' + APP_TEXT.portfolio.toLowerCase(),
			image: <Icon type='share' withBackground />,
			onClick: () => console.log('delete portfolio'),
		},
		{
			name: APP_TEXT.edit + ' ' + APP_TEXT.portfolio.toLowerCase(),
			image: <Icon type='edit' withBackground />,
			onClick: () => console.log('edit portfolio'),
		},
		{
			name: APP_TEXT.delete + ' ' + APP_TEXT.portfolio.toLowerCase(),
			image: <Icon type='delete' className='bg-red-100 text-red-600' withBackground />,
			onClick: () => console.log('delete portfolio'),
		},
	],
] as ManagementSettingsConfigs;
const portfolioConfigs = [
	{
		name: 'Portfolio 1',
		description: '10 assets',
		rightName: '9 990 $',
		rightDescription: (
			<div className='flex items-center gap-1.5 text-red-600'>
				<div>-7 631$</div>
				<div className='size-0.5 rounded-full bg-red-600' />
				<div>78.91%</div>
			</div>
		),
		image: <Icon type='portfolio' withBackground />,
	},
	{
		name: 'Portfolio 2',
		description: '12 assets',
		rightName: '8 865 $',
		rightDescription: (
			<div className='flex items-center gap-1.5 text-red-600'>
				<div>-2 947$</div>
				<div className='size-0.5 rounded-full bg-red-600' />
				<div>56.78%</div>
			</div>
		),
		image: <Icon type='portfolio' withBackground />,
	},
	{
		name: 'Portfolio 3',
		description: '11 assets',
		rightName: '6 798 $',
		rightDescription: (
			<div className='flex items-center gap-1.5 text-red-600'>
				<div>-765$</div>
				<div className='size-0.5 rounded-full bg-red-600' />
				<div>32.21%</div>
			</div>
		),
		image: <Icon type='portfolio' withBackground />,
	},
];
const tabConfigs = [
	{name: '24h', path: '24h'},
	{name: '7d', path: '7d'},
	{name: '1m', path: '1m'},
	{name: '6m', path: '6m'},
	{name: '1y', path: '1y'},
	{name: 'All time', path: 'All time'},
];

export function AppHeader() {
	const location = useLocation();
	const navigate = useNavigate();

	const {logout} = AuthModel.useLogout();
	const {authUser} = AuthModel.useAuthUser();

	const {popupProps: userPopupProps, openPopup: openUserPopup} = usePopupState();
	const {
		popupProps: portfolioPopupProps,
		openPopup: openPortfolioPopup,
		closePopup: closePortfolioPopup,
	} = usePopupState();
	const {
		popupProps: portfolioSettingsPopupProps,
		openPopup: openPortfolioSettingsPopup,
		closePopup: closePortfolioSettingsPopup,
	} = usePopupState();

	const [dataFilter, setDataFilter] = useState('24h');

	return (
		<header role='app-header' className='mb-4 flex items-center justify-between'>
			<Button type='circle' onClick={openUserPopup} icon={<Icon type='user' />} className='w-fit' />

			{location.pathname === APP_PATH.portfolio.list && (
				<>
					<div
						className={cn(
							'flex items-center gap-2 text-xl font-medium',
							portfolioPopupProps.isOpen && 'text-primary-grey',
						)}
						onClick={openPortfolioPopup}
					>
						<div>Portfolio 1</div>
						<Icon type='selectChevron' className='size-3 flex-shrink-0' />
					</div>

					<div className='flex size-11 items-center justify-center'>
						<Button
							type='icon'
							icon={
								<Icon
									type='settings'
									className={cn(
										'text-xl',
										portfolioSettingsPopupProps.isOpen && 'text-primary-grey transition duration-200',
									)}
								/>
							}
							className='rounded-full bg-light-grey p-2'
							onClick={openPortfolioSettingsPopup}
						/>
					</div>
				</>
			)}

			<Popup {...userPopupProps}>
				<div className='mb-3 flex flex-col items-center gap-2'>
					<div className='flex size-11 items-center justify-center rounded-full bg-secondary-violet text-primary-violet'>
						<Icon type='user' />
					</div>
					<div>{authUser?.email}</div>
				</div>

				<Item image={<Icon type='logout' withBackground />} name={APP_TEXT.logOut} onClick={() => logout()} />
			</Popup>

			<Popup {...portfolioPopupProps}>
				<div className='flex flex-col gap-4'>
					<div className='flex justify-between rounded-2xl'>
						{tabConfigs.map(({name, path}, index) => (
							<div
								key={index}
								className={cn(
									'cursor-pointer rounded-3xl px-3 py-2 text-sm transition duration-200',
									dataFilter === path ? 'bg-white' : 'bg-inherit text-primary-grey',
								)}
								onClick={() => setDataFilter(path)}
							>
								{name}
							</div>
						))}
					</div>

					<Item
						image={<Icon type='portfolio' withBackground />}
						name='Total portfolio'
						description='35 assets'
						rightName='25 653$'
						rightDescription={
							<div className='flex items-center gap-1.5 text-red-600'>
								<div>-765$</div>
								<div className='size-0.5 rounded-full bg-red-600' />
								<div>32.21%</div>
							</div>
						}
					/>

					<Card
						titleInCard={'Portfolios'}
						rightTitleInCard={
							<div
								className='-m-1 flex items-center gap-3 p-1'
								onClick={() => {
									closePortfolioPopup();
									PopupHelpers.runAfterPopupClosed(() => navigate(APP_PATH.portfolio.create));
								}}
							>
								<Icon type='plus' className='size-4' />
							</div>
						}
					>
						<List
							items={portfolioConfigs}
							renderItem={(portfolioConfig) => {
								const checked = portfolioConfig.name === 'Portfolio 1';
								return (
									<Item
										{...portfolioConfig}
										imageIcon={checked && <Icon type='check' />}
										className={checked && 'bg-light-grey'}
									/>
								);
							}}
						/>
					</Card>
				</div>
			</Popup>

			<Popup {...portfolioSettingsPopupProps}>
				<div className='flex flex-col gap-4'>
					{settingsConfigs.map((settingsConfig, index) => (
						<List
							key={index}
							items={settingsConfig}
							renderItem={(settingConfig) => (
								<Item
									{...settingConfig}
									onClick={
										settingConfig.onClick
											? ({navigate}) => {
													closePortfolioSettingsPopup();
													PopupHelpers.runAfterPopupClosed(() => settingConfig.onClick!({navigate}));
											  }
											: undefined
									}
								/>
							)}
						/>
					))}
				</div>
			</Popup>
		</header>
	);
}

const appTabConfigs: {name: string; path: string}[] = [
	{name: APP_TEXT.portfolios, path: APP_PATH.portfolio.list},
	{name: APP_TEXT.goals, path: APP_PATH.goal.list},
];

export function AppTabs() {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<div className='my-4 flex gap-2'>
			{appTabConfigs.map(({name, path}, index) => (
				<div
					key={index}
					className={cn(
						'cursor-pointer rounded-3xl px-4 py-2 text-sm transition duration-200',
						location.pathname === path ? 'bg-white' : 'bg-inherit text-primary-grey',
					)}
					onClick={() => navigate(path)}
				>
					{name}
				</div>
			))}
		</div>
	);
}

const sidebarConfigs = [
	{
		label: 'Home',
		path: '/',
		icon: <div>Home</div>,
	},
	{
		label: 'Tracker',
		path: '/',
		icon: <div>Home</div>,
	},
	{
		label: 'Invest',
		path: '/',
		icon: <div>Home</div>,
	},
	{
		label: 'Calculator',
		path: '/',
		icon: <div>Home</div>,
	},
];

export function AppSidebar() {
	return (
		<div role='app-navbar' className='w-52'>
			<div className='mb-12 flex pl-4 text-2xl font-bold'>
				<Icon type='user' />
			</div>

			{/* APP LOGO */}
			<div>Finansy</div>

			<nav>
				{sidebarConfigs.map(({label, path, icon}, index) => (
					<div
						className={cn(
							'flex cursor-pointer rounded-2xl px-4 py-3 hover:bg-secondary-grey',
							index === 0 && 'bg-white',
						)}
						key={label + path}
						onClick={() => alert(label + ' module')}
					>
						<div className={cn('mr-4')}>{icon}</div>
						<div className={cn('font-medium text-primary-grey', index === 0 && 'text-primary-violet')}>{label}</div>
					</div>
				))}
			</nav>
		</div>
	);
}
