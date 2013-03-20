// ### Main application setup

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

require( [
	'jquery',
	'backbone',
	'app/views/app-view',
	'app/collections/list-collection',
	'bootstrap'
], function( $, Backbone, AppView, ListCollection ) {
		// Create a new ListCollection
	    var list_collection = new ListCollection();
		// Flash types is for defining what type of flash to display,
		// They are global in Backbone and can be uses: Backbone.FLASH_TYPES.success|warning|info|error
	    Backbone.FLASH_TYPES = {
			success: "success",
			warning: "warning",
			info: "info",
			error: "error"
		};
	    // Initialize and render a new AppView
	    var app_view = new AppView( { collection: list_collection } );
	    Backbone.trigger('app:index');
    }
);