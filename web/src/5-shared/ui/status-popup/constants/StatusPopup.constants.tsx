export const STATUS_POPUP_TEXT = {
	accountCreateSuccess: {
		title: (
			<>
				Your account has been <span className='text-primary-violet'>successfully</span> created
			</>
		),
		description: '',
	},
	goalDeleteSuccess: {
		title: 'Goal has been deleted',
		description: '',
	},
	goalDeleteError: {
		title: 'Goal has not been deleted',
		description: '',
	},
} as const;
