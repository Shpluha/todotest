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