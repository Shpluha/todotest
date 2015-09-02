$(function() {
	'use strict';

	var todoList     = new TodoList(),
		todoListView = new TodoListView({
			collection: todoList
		});

		todoListView.render();
		todoList.fetch({
			success: function() {
				todoListView.renderTodos();
			}
		});
});