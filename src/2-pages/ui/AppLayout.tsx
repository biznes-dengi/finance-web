import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {cn} from '@shared/lib';
import {Button, Card, Icon, Item, Popup, usePopupState} from '@shared/ui';
import {AuthModel} from '@entities/auth';
import {APP_PATH, APP_TEXT} from '@shared/constants';

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

export function AppHeader() {
	const location = useLocation();
	// const navigate = useNavigate();

	const {logout} = AuthModel.useLogout();
	const {authUser} = AuthModel.useAuthUser();

	const {popupProps: userPopupProps, openPopup: openUserPopup} = usePopupState();
	const {
		popupProps: portfolioPopupProps,
		openPopup: openPortfolioPopup,
		// closePopup: closePortfolioPopup,
	} = usePopupState();

	// function handleCreatePortfolioClick() {
	// 	closePortfolioPopup();
	// 	PopupHelpers.runAfterPopupClosed(() => navigate(APP_PATH.portfolio.create));
	// }

	return (
		<header role='app-header' className='mb-4 flex items-center justify-between'>
			<Button type='circle' onClick={openUserPopup} icon={<Icon type='user' />} className='w-fit' />

			{location.pathname === APP_PATH.portfolio.list && (
				<div className='flex items-center gap-2 text-xl font-medium' onClick={openPortfolioPopup}>
					<div>Portfolio 1</div>
					<Icon type='selectChevron' className='size-3 flex-shrink-0' />
				</div>
			)}

			<div className='size-11' />

			<Popup {...userPopupProps}>
				<div className='mb-3 flex flex-col items-center gap-2'>
					<div className='flex size-11 items-center justify-center rounded-full bg-secondary-grey'>
						<Icon type='user' />
					</div>
					<div>{authUser?.email}</div>
				</div>

				<Item icon={<Icon type='logout' />} name={APP_TEXT.logOut} onClick={() => logout()} />
			</Popup>

			<Popup {...portfolioPopupProps}>
				<div className='mb-3'>
					<Card titleInCard={'Portfolios'} rightTitleInCard={'create edit delete'}>
						<Item name={'Portfolio 1'} />
						<Item name={'Portfolio 2'} />
						<Item name={'Portfolio 3'} />
					</Card>
				</div>
			</Popup>
		</header>
	);
}

const tabConfigs: {name: string; path: string}[] = [
	{name: APP_TEXT.goal, path: APP_PATH.goal.list},
	{name: APP_TEXT.portfolio, path: APP_PATH.portfolio.list},
];

export function AppTabs() {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<div className='my-4 flex gap-2'>
			{tabConfigs.map(({name, path}, index) => (
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
