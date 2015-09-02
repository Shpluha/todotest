describe('Sort', function() {
	var modelList;

	beforeEach(function() {
		modelList = new TodoList();
		modelList.add([
				{title: 1, order: 0},
				{title: 2, order: 1},
				{title: 3, order: 2},
				{title: 4, order: 3},
				{title: 5, order: 4}
			]);
	});

	it('from 4 to 2', function() {
		modelList.updateSort(3, 1);
		expect(modelList.pluck('title')).toEqual([1, 4, 2, 3, 5]);
	});

	it('from 2 to 4', function() {
		modelList.updateSort(1, 3);
		expect(modelList.pluck('title')).toEqual([1, 3, 4, 2, 5]);

	});
});