"use strict"

$(function() {
	var Todo = Backbone.Model.extend({

		defaults: {
			title: 'Новая задача',
			done: false,
			priority: 0
		},

		priorityValues: {
			0: 'minor',
			1: 'major',
			2: 'critical'
		}

	});

	var TodoList = Backbone.Collection.extend({

		model: Todo,

		localStorage: new Backbone.LocalStorage('todos-backbone'),

		comparator: function(model) {
			return model.get('priority');
		}

	});

	var TodoView = Backbone.View.extend({

		tagName: "li",

		template: _.template($('#todo-template').html()),

		events: {
			'click .remove': 'destroyModel',
			'dblclick .title': 'editTitle',
			'keypress .edit': 'updateModel',
			'blur .edit': 'render',
			'click i#done-status': 'changeDone'
		},

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function() {
			this.$el.html(this.template({primaryAttributes: this.model.toJSON(), secondaryAttributes: this.model.priorityValues}));
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
		},

		changeDone: function() {
			var status = !this.model.get('done');
			this.model.save({done: status});
		}
	});

	var TodoListView = Backbone.View.extend({

		el: '#todoapp',

		template: _.template($('#todolist-template').html()),

		events: {
			'keypress #new-todo': 'createOnEnter',
			'click #create-button': 'create'
		},

		initialize: function() {
			var self = this;
			this.listenTo(this.collection, 'add', this.renderTodo);
			this.listenTo(this.collection, 'remove', this.checkTodosLengh);
			this.listenTo(this.collection, 'reset', this.renderAll);
		},

		createOnEnter: function(e) {
			if (e.keyCode != 13) return;
			this.create();
		},

		create: function() {
			var input = this.$('#new-todo'),
				priority = +this.$('select').val();

			if (!input.val()) return;

			this.collection.create(
				{title: input.val(),
				priority: priority});
      		input.val('');
		},

		render: function() {
			this.$el.html(this.template());
			return this;
		},

		renderTodos: function() {
			this.$('#todo-list').empty();
			_.each(this.collection.models, function(model) {
				this.renderTodo(model);
			}, this);
		},

		renderTodo: function(todo) {
			var modelView = new TodoView({
					model: todo
				});

			this.$('#todo-list').append(modelView.render().el);

			this.checkTodosLengh();
		},

		renderAll: function() {
			this.collection.each(renderTodo, this);
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
		// todoList.fetch();
		todoList.fetch({
			success: function() {
				todoListView.renderTodos();
			}
		});
});