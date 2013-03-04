// ### AppView
// _Main application view_
define([
	'jquery',
	'underscore',
	'backbone',
	'app/views/list',
	'app/views/sidebar'
], function( $, _, Backbone, ListView, SidebarView ) {

	var AppView = Backbone.View.extend({
		
		initialize: function() {
			// Event listeners
			Backbone.on( 'app:index', this.appIndex, this );
			Backbone.on( 'show:list', this.showList, this );		
			
			// Primary placeholders
			this.sidebar = "#sidebar";
			this.main = "#main";  
		},
		// Render the application sidebar
		appIndex: function() {
			var sidebar_view = new SidebarView( { el: $( this.sidebar ), collection: this.collection } );
			sidebar_view.render();
		},
		// When 'show:list' is triggered, render ListView
		showList: function( listModel ) {
			var list_view = new ListView( { el: $( this.main ), model: listModel } );
			list_view.render();
		}
		
	});

	return AppView;
});