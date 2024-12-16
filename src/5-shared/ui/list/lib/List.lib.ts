export function getEmptyText(key: 'transactions' | 'goals') {
	if (key === 'transactions') {
		return 'Transactions will appear here';
	}

	if (key === 'goals') {
		return 'Your goals will appear here';
	}
}
