// ### Model for Task
// _Defines default setup and relations_
define([
	'backbone'
	], function( Backbone ){

		var TaskModel = Backbone.RelationalModel.extend({

			initialize: function() {
				
			},

			validate: function( attrs ) {
			  if ( !attrs.content || !attrs.content.match(/\S/) ) {
					return "You must enter something!";
				}

				if ( !typeof attrs.complete === 'boolean') {
					return "Must be boolean";
				}
			},	

			defaults: {
				content: 'Ny task',
				complete: false
			},
		});

		return TaskModel;	
});