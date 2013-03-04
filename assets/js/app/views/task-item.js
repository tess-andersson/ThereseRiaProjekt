// ### TaskItemView
// _Display one task item_
define([
	'jquery',
	'underscore',
	'backbone',
	'text!app/templates/tasks.html'
], function( $, _, Backbone, TaskTemplate ) {
	
	var TaskItemView = Backbone.View.extend({
		// Todo tasks is displayed in a table
		tagName: 'tr',
		className: 'task-item',

		template: _.template( TaskTemplate ),

		initialize: function() { 
			
			// Listen to changes on model
			this.listenTo( this.model, 'add', this.render );
			this.listenTo( this.model, 'change', this.render );
			
			// Get associated list
			this.list = this.model.get( 'list' );
		},
		
		events: {
			'change #complete' : 'toggleCompleted',
			'click .delete-task' : 'deleteTask'
		},

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		},
		
		// Destroy model and save associated list model
		deleteTask: function() {
			this.model.destroy();
			this.list.save();
		},
		
		// Function for toogling completed on task
		// Todo: Maybe in model?
		toggleCompleted: function() {
			if( this.model.get( 'complete' ) === false ) {
				this.model.set( 'complete', true );
				
				// Toogle the css class too
				this.$('.task-container').addClass('complete');
			} else {
				this.model.set( 'complete', false );
			}
			
			this.list.save();
		}
	});

	return TaskItemView;
});