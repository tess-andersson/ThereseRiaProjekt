// ### SidebarView
// _Sidebar for displaying list collection_
define([
	'jquery',
	'underscore',
	'backbone',
	'app/views/list-item',
	'text!app/templates/sidebar.html'
], function( $, _, Backbone, ListItemView, SidebarTemplate ) {

	var SidebarView = Backbone.View.extend({

		template: _.template( SidebarTemplate ),

		initialize: function() {
			// Listen to changes to collection
			this.listenTo( this.collection, 'add', this.addList );	
			
			// Fetch collections when initialized 
			this.collection.fetch();
		},
		
		events: { 
			'keypress .add-list' : 'addListOnEnter'
		},

		// Render sidebar and add stored lists
		render: function() {
			this.$el.html( this.template() );
			this.collection.each( this.addList, this );
			return this;	
		},
		
		// Create a new ListItemView
		addList: function( listModel ) {	
			var list_view = new ListItemView( { model: listModel } );
			this.$('#all-lists').append( list_view.render().el );
		},

		addListOnEnter: function( e ) {
			if( e.keyCode === 13 ) {
				var list_title = this.$('.add-list').val();	
					
				// Add new list to collection
				this.collection.create( { title: list_title } );
				
				// Empty form field
				this.$('.add-list').val('');			
				return false;			
			} 
		}
	});

	return SidebarView;
});