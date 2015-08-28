$(function() {
	$('.todo-list').sortable({
		axis: 'y',
		containment: 'parent',
		cursor: 'move',
		tolerance: 'pointer',
		update: function(event, ui) {
			ui.item.trigger('drop', ui.item.index());
		}
});
});