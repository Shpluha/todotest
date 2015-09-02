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