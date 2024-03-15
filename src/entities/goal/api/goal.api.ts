export class GoalApi {
	static fetchList() {
		const data = [{name: 'list-item-1'}, {name: 'list-item-2'}, {name: 'list-item-3'}];

		return Promise.resolve(data);
	}
}

// TODO-blog: class vs separate function
// 	я думаю делать через separate function, потому что класс содержит все методы и когда импортим его
// 	импортим все, а не только 1 метод, что расширяет бандл
//  -> если уже прилетел код с бека, то прилетят все методы, а не только 1 (?)
