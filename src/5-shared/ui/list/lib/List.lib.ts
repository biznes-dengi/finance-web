import {EmptyTextKey} from '@shared/ui/list/types/List.types.ts';

export function getEmptyText(key: EmptyTextKey) {
	const [firstLetter, ...rest] = key;

	return `${firstLetter.toUpperCase()}${rest.join('')} will appear here`;
}
