(function(){
	'use strict';

	window.TodoListView = Backbone.View.extend({

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
})();