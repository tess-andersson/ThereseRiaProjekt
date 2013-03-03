require.config({
	paths: {
		jquery: 'lib/jquery/jquery-1.9.1.min',
		underscore: 'lib/underscore/underscore-min',
		backbone: 'lib/backbone/backbone-all',
		backboneFull: 'lib/backbone/backbone',
		localStorage: 'lib/backbone/backbone.localStorage',
		backboneRelational: 'lib/backbone/backbone-relational',
		text: 'lib/requirejs/text',
		bootstrap: 'lib/twitter-bootstrap/bootstrap.min',
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backboneFull: {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		},
		localStorage: {
			deps: ['underscore', 'backboneFull']
		},
		backboneRelational: {
		    deps: ['underscore', 'backboneFull']	
		},
		bootstrap: {
			deps: ['jquery']
		}
	}
});
require( ['app/app'], 
	function( App ) {
	    App.initialize();
    }
);