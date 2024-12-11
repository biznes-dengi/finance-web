export const STATUS_DIALOG_TEXT = {
	accountCreated: {
		title: (
			<>
				Your account has been <span className='text-primary-violet'>successfully</span> created
			</>
		),
		description: '',
	},
	goalAchieved: {
		title: 'Поздравляем',
		description: (
			<>
				<div>Вы пришли к своей цели! Это отличный результат, и мы гордимся вами.</div>
				<div className='mt-2'>
					Когда другие сдавались, вы проявили настойчивость — и вот результат:{' '}
					<span className='font-medium text-primary-violet'>вы можете осуществить свою мечту</span>.
				</div>
				<div className='mt-2'>
					Желаем вам дальнейших успехов и пусть впереди будет еще больше целей, которые вы легко достигнете!
				</div>
			</>
		),
	},
} as const;
