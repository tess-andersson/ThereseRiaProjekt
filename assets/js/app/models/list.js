// ### Model for List
// _Defines default setup and relations_
define([
	'backbone',
	'app/models/task'
	], function( Backbone, TaskModel ){
		
		var ListModel = Backbone.RelationalModel.extend({
						
			initialize: function() {
				this.on('add:task', this.saveTask, this);
				this.on('change:task', this.saveTask, this);
			},
			
			defaults: {
				title: 'Ny lista'
			},
			
			validate: function( attrs ) {
				if ( !attrs.title || !attrs.title.match(/\S/) ) {
					return "You must enter a title";
				};
			},
			
			// Define the relationship between app models
			relations: [{
				type: Backbone.HasMany,
				relatedModel: TaskModel,
				key: 'tasks',
				reverseRelation: {
					key: 'list'
				}
			}],
			
			// On triggered events to add to collection
			saveTask: function( t ) {
				this.get('tasks').add( t );
				this.save();
			}
					
		});
		
		return ListModel;	
});