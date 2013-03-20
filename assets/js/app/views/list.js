// ### ListView
// _Render display of list_
define([
	'jquery',
	'underscore',
	'backbone',
	'app/views/task-item',
	'app/views/create-task',
	'text!app/templates/list.html'
], function( $, _, Backbone, TaskItemView, CreateTaskView, ListTemplate ) {

	var ListView = Backbone.View.extend({

		tagName: 'div',
		className: 'list-container',

		template: _.template( ListTemplate ),

		initialize: function() {
			// Get tasks for specific model
			this.tasks = this.model.get( 'tasks' );
			
			this.create_form = ".create-task-form";
			
			// Listening to changes on tasks
			this.listenTo( this.tasks, 'add', this.render );
			this.listenTo( this.tasks, 'remove', this.render );	
			
			// Cleans up main div if a list is deleted
			Backbone.on( 'delete:list', this.unrender, this );	
		},

		events: { 
			'click .add-task' : 'addTask'
		},

		render: function() {
			var task_view;
			this.$el.html( this.template( { list: this.model.toJSON() } ) );

			// Loop through tasks and append to #tasks-div		
			this.tasks.forEach( function( t ){
				task_view = new TaskItemView( { model: t } );
				$('#tasks').append( task_view.render().el );
			});

			return this;
		},
	
		// Create and render view for adding new tasks
		addTask: function( e ) {
			var create_task_view = new CreateTaskView( { model: this.model } );

			e.preventDefault();
			$(".task-form").html('');
			
			$('.task-form').append( create_task_view.render().el );
			
			// Set focus to input field
			$('.task-value').focus();
		},
		
		unrender: function() {
			this.$el.html('');
		}

	});

	return ListView;
});