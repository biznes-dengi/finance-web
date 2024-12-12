export const STATUS_POPUP_TEXT = {
	accountCreateSuccess: () => (
		<>
			Your account has been <span className='text-primary-violet'>successfully</span> created
		</>
	),
	//TODO: Your goal has been renamed to "Бабки 2"
	goalUpdateSuccess: (statusTextProps?: any) => 'Your goal has been updated',
	goalUpdateError: () => 'Your goal has not been updated',
	goalDeleteSuccess: () => 'Your goal has been deleted',
	goalDeleteError: () => 'Your goal has not been deleted',
} as const;
