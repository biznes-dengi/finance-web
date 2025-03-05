import {EmptyTextKey} from '@shared/ui/list/types/List.types.ts';

export function getEmptyText(key: EmptyTextKey) {
	return `${key.toLocaleLowerCase()} will appear here`;
}
