// ### Main setup
// Initializes the primary router
define([
	'backbone',
	'app/routers/router',
	'bootstrap'
], function( Backbone, Router ) {
	var initialize = function() {
		new Router();
	};
	return {
		initialize: initialize
	};
});