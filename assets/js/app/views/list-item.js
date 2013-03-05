	// ### ListItemView
// _Rendering one list item in sidebar_
define([
	'jquery',
	'underscore',
	'backbone',
	'text!app/templates/list-item.html'
], function( $, _, Backbone, ListItemTemplate ) {

	var ListItemView = Backbone.View.extend({
		// Display each item in a list element
		tagName: 'li',
		className: 'list-item',

		template: _.template( ListItemTemplate ),

		initialize: function() { },

		events: {
			'click .delete-btn' : 'deleteList',
			'click .show-list': 'showList',
			'mouseover' : 'toggleDeleteButton',
			'mouseout' : 'toggleDeleteButton'
		},

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		},
		
		// When list-item is clicked, trigger 'show:list'
		showList: function() {
			Backbone.trigger("show:list", this.model);
		},
		
		// Destroy model and clean up $el
		deleteList: function( e ) {
			this.model.destroy();
			this.remove();
			Backbone.trigger("delete:list");
		},
		
		// Toggle delete button
		toggleDeleteButton: function() {
			this.$('.delete-btn').toggleClass('show');
		}

	});

	return ListItemView;
});