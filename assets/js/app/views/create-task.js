// ### CreateTaskView
// _Rendering form for adding tasks_
define([
	'jquery',
	'underscore',
	'backbone',
	'app/models/task',
	'text!app/templates/create-task.html'
], function( $, _, Backbone, TaskModel, CreateTaskTemplate ) {

	var CreateTaskView = Backbone.View.extend({
		// Render each item within a div
		tagName: 'div',
		className: 'create-task',

		template: _.template( CreateTaskTemplate ),

		// Constructor
		initialize: function() { 
			this.list_model = this.model;
			this.task = new TaskModel();

			// Listens to validation errors on the task
			this.listenTo(this.task, 'invalid', this.renderErrors, this);
		},
		
		renderErrors: function( model, errors ) {
			// Grab the control-group element
			var controlGroup = this.$( '.control-group' );

			// Add an error class to it, makin it sparkling red!
			controlGroup.addClass( 'error' );

			// Add the error message to the error container
			// Currently only appending one message since the validation only returns one value
			controlGroup.parent().find('#taskErrors').html( "<span class='help-inline'>" + errors + "</span>" );
		},

		// Listen to events on form
		events: {
			'click #create-task-btn' : 'createTask',
			'keypress #newTaskInput': 'createTask',
			'click .cancel' : 'cancelCreate'
		},

		render: function() {
			this.$el.html( this.template() );
			return this;
		},
		
		// Creates a task and trigger add-event on model
		createTask: function( e ) {
			// Tries to set the model if the user clicked the button or pressed enter key
			if ( e.keyCode && e.keyCode === 13 || !e.keyCode ) {

				// The set method will return false if not set, also triggering the invalid event
				// Else, the add:task is triggered
				if ( this.task.set({ content: this.$('.task-value').val() }, { validate: true } )) {
					this.list_model.trigger( 'add:task', this.task );
					Backbone.trigger('show:flashMessage', {
						header: "Success!",
						text: "Task was created.",
						type: Backbone.FLASH_TYPES.success
					});
				}
			}
		},
		
		// Function for canceling adding a todo
		cancelCreate: function() {
			this.remove();
		}

	});

	return CreateTaskView;
});