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