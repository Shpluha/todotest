var todo_template = {
	model_template: '<div class="todo__view">' +
				'<i class="todo__status<%= primaryAttributes.done ? " todo__status--done": "" %>" id="done-status"></i>' +
				'<span class="todo__title todo__title--priority-<%= secondaryAttributes[primaryAttributes.priority] %>' +
					'<%= primaryAttributes.done ? " todo__title--done": "" %>">' +
					'<%- primaryAttributes.title %>' +
				'</span>' +
				'<i class="todo__remove"></i>' +
			'</div>',

	form_template: '<input type="text" class="form__input" value="<%= model.title ? model.title : "" %>" >' +
			'<select class="form__select">' +
				'<option value="0" <%= model.priority === 0 ? "selected" : "" %>>Minor</option>' +
				'<option value="1" <%= model.priority === 1 ? "selected" : "" %>>Major</option>' +
				'<option value="2" <%= model.priority === 2 ? "selected" : "" %>>Critical</option>' +
			'</select>' +
			'<button class="form__button" data-action="<%= buttonMode %>"></button>' ,

	app_template: '<header class="header">' +
		 	'<h1 class="header__title">To do</h1>' +
		  '</header>' +
			
		  '<section id="main">' +
			'<ul class="todo-list" id="todo-list"></ul>' +
			'<div class="todo__empty">Нет задач</div>' +
		  '</section>'
};