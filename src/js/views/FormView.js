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