export const STATUS_POPUP_TEXT = {
	accountCreateSuccess: () => (
		<>
			Your account has been <span className='text-primary-violet'>successfully</span> created
		</>
	),
	goalUpdateSuccess: () => 'Ваша цель была обновлена',
	goalUpdateError: () => 'Your goal has not been updated',
	goalDeleteSuccess: () => 'Your goal has been deleted',
	goalDeleteError: () => 'Your goal has not been deleted',
} as const;
