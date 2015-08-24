"use strict"

$(function() {
	var Todo = Backbone.Model.extend({

		defaults: {
			title: "Новая задача",
			done: false,
			priority: 0
		}

	});

	var TodoList = Backbone.Collection.extend({
		model: Todo
	});

	var TodoView = Backbone.View.extend({

		tagName: "li",

		template: _.template($('#todo-template').html()),

		events: {
			'click .remove': 'destroyModel',
			'dblclick .title': 'editTitle',
			'keypress .edit': 'updateModel',
			'blur .edit': 'render'
		},

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		destroyModel: function() {
			this.model.destroy();
		},

		editTitle: function() {
			this.$('.title').hide();
			this.$('.edit').show().focus();
		},

		updateModel: function(event) {
			if (event.keyCode != 13) return;

			var value = this.$('.edit').val();

			if (!value) this.destroyModel();
			if (this.model.get('title') === value) {
				this.render();
			}

			this.model.set({title: value});
		}

	});

	var TodoListView = Backbone.View.extend({

		el: '#todoapp',

		template: _.template($('#todolist-template').html()),

		events: {
			"keypress #new-todo": "create"
		},

		initialize: function() {
			this.listenTo(this.collection, 'add', this.renderTodo);
			this.listenTo(this.collection, 'remove', this.checkTodosLengh);
		},

		create: function(e) {
			var input = this.$('#new-todo');
			if (e.keyCode != 13) return;
			if (!input.val()) return;

			this.collection.add({title: input.val()});
      		input.val('');
		},

		render: function() {
			this.$el.html(this.template());
			return this;
		},

		renderTodo: function(todo) {
			var modelView = new TodoView({
					model: todo
				});

			this.$('#todo-list').append(modelView.render().el);

			this.checkTodosLengh();
		},

		checkTodosLengh: function() {
			if (this.collection.length) {
				this.$('#none-todo').hide();
			} else {
				this.$('#none-todo').show();
			}
		}
	});

	var todoList     = new TodoList(),
		todoListView = new TodoListView({
			collection: todoList
		});

		todoListView.render();
		todoList.add([{}, {}]);
});