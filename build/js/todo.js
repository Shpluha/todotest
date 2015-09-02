var TodoModel = Backbone.Model.extend({

	defaults: {
		title: 'Новая задача',
		done: false,
		priority: 0,
		order: 0
	},

	priorityValues: {
		0: 'minor',
		1: 'major',
		2: 'critical'
	}

});
(function(){
	'use strict';

	window.TodoList = Backbone.Collection.extend({

		model: TodoModel,

		localStorage: new Backbone.LocalStorage('todos-backbone'),

		updateSort: function(startIndex, stopIndex) {
			var sortModel = this.at(startIndex);

			this.at(startIndex).destroy();

			this.each(function(model) {
				var order = model.get('order');
				if (stopIndex < startIndex && order >= stopIndex && order < startIndex) {
					order += 1;
					model.save({order: order});
				} else if (order <= stopIndex && order > startIndex) {
					order -= 1;
					model.save({order: order});
				}
			});

			sortModel.set({order: stopIndex});

			this.create(sortModel);
		},

		nextOrder: function() {
			if (!this.length) return 0;
	  		return this.last().get('order') + 1;
	  	},

	  	comparator: function(model) {
	  		return model.get('order');
	  	}
		
	});
})();
var FormView = Backbone.View.extend({

	tagName: 'div',

	className: 'form',

	template: _.template(todo_template.form_template),

	events: {
		'click .form__button[data-action="update"]': 'updateModel',
		'click .form__button[data-action="create"]': 'create'
	},

	initialize: function(options) {
		this.options = options || {};
	},

	render: function() {
		this.$el.html(this.template({
			model: this.model ? this.model.toJSON() : {},
			buttonMode: this.options.buttonMode
		}));
		return this;
	},

	updateModel: function() {
		var value = this.$('.form__input').val(),
			priority = parseInt(this.$('.form__select').val());

		if (value) {
			this.model.save({
				title: value,
				priority: priority
			});
		} else {
			this.model.destroy();
		}

		this.remove();
	},

	create: function() {
		var input = this.$('.form__input'),
			priority = +this.$('.form__select').val();

		if (!input.val()) return;

		this.collection.create(
			{title: input.val(),
			priority: priority,
			order: this.collection.nextOrder()
		});

  		input.val('');
	}
});
var TodoListView = Backbone.View.extend({

	el: '#todo-app',

	template: _.template(todo_template.app_template),

	initialize: function() {
		var self = this;
		this.listenTo(this.collection, 'add', this.renderTodos);
		this.listenTo(this.collection, 'remove', this.checkTodosLengh);
		this.listenTo(this.collection, 'reset', this.renderAll);
	},

	render: function() {
		var formView = new FormView({
			collection: this.collection,
			buttonMode: 'create'
		});
		this.$el.html(this.template());
		this.$('.header').append(formView.render().el);
		this.initSortable();
		return this;
	},

	initSortable: function() {
		var startIndex,
			self = this;

		this.$('.todo-list').sortable({
			axis: 'y',
			containment: 'parent',
			cursor: 'move',
			tolerance: 'pointer',
			start: function(event, ui) {
				startIndex = ui.item.index();
			},
			update: function(event, ui) {
				self.collection.updateSort(startIndex, ui.item.index());
			}
		});
	},

	renderTodos: function() {
		this.$('.todo-list').empty();
		_.each(this.collection.models, function(model) {
			this.renderTodo(model);
		}, this);
	},

	renderTodo: function(todo) {
		var modelView = new TodoView({
				model: todo
			});

		this.$('.todo-list').append(modelView.render().el);

		this.checkTodosLengh();
	},

	renderAll: function() {
		this.collection.each(this.renderTodo, this);
	},

	checkTodosLengh: function() {
		if (this.collection.length) {
			this.$('.todo__empty').hide();
		} else {
			this.$('.todo__empty').show();
		}
	}
});
var TodoView = Backbone.View.extend({

	tagName: 'li',

	className: 'todo',

	template: _.template(todo_template.model_template),

	events: {
		'dblclick .todo__title': 'editTitle',
		'click .todo__remove': 'destroyModel',
		'click .todo__status': 'changeDone'
	},

	initialize: function() {
		this.listenTo(this.model, 'change sync', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render: function() {
		this.$el.html(this.template({
			primaryAttributes: this.model.toJSON(), 
			secondaryAttributes: this.model.priorityValues
		}));
		return this;
	},

	editTitle: function() {
		var formView = new FormView({
			model: this.model,
			buttonMode: 'update'
		});
		this.$el.html(formView.render().el);
	},

	destroyModel: function() {
		this.model.destroy();
	},

	changeDone: function() {
		var status = !this.model.get('done');
		this.model.save({done: status});
	}
});
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