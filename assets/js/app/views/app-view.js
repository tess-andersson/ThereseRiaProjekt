// ### AppView
// _Main application view_
define([
	'jquery',
	'underscore',
	'backbone',
	'app/views/list',
	'app/views/sidebar'
], function( $, _, Backbone, ListView, SidebarView ) {

	// Instansiera collectionen 
	var AppView = Backbone.View.extend({
		
		initialize: function() {
			// Event listeners
			Backbone.on( 'app:index', this.appIndex, this );
			Backbone.on( 'show:list', this.showList, this );		
		},
		// Render the application sidebar
		appIndex: function() {
			var sidebar = '#sidebar';
						
			var sidebar_view = new SidebarView( { el: $( sidebar ), collection: this.collection } );
			sidebar_view.render();
		},
		
		// When 'show:list' is triggered, render ListView
		showList: function( listModel ) {
			var main = "#main";			
			var list_view = new ListView( { el: $( main ), model: listModel } );
			
			$( main ).empty().append( list_view.render().el );
		}
		
	});

	return AppView;
});