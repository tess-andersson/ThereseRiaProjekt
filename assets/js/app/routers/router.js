// ### Main router
// _Defines default routes and actions_
define([
    'jquery',
    'backbone',
    'app/views/app-view',
    'app/collections/list-collection',
], function( $, Backbone, AppView, ListCollection ) {

    var AppRouter = Backbone.Router.extend({      
        
        initialize: function() {
            // Create a new ListCollection
            this.list_collection = new ListCollection(); 
            
            // Start Backbone.history for routes and navigation              
            Backbone.history.start();    
        },
        
        routes: {
            '': 'index',
            '*actions': 'defaultRoute'
        },

        index: function() {
            // Initialize and render a new AppView          
            var app_view = new AppView( { collection: this.list_collection } );            
            Backbone.trigger('app:index');
            
        },    

        defaultRoute: function( action ) {
            console.log('Route: ' + action);
        }
    });
    
    return AppRouter;
});