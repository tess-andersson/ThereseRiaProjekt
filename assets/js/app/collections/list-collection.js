// ### Collection for lists
define([
	"backbone",
	'app/models/list'
], function( Backbone, ListModel ) {
	
	var ListCollection = Backbone.Collection.extend({
		
		model: ListModel,
		url: '/list',
		
		// Store collection in localStorage
		localStorage: new Backbone.LocalStorage( 'Lists' ),
		
		initialize: function() { }
	});
	
	return ListCollection;
});