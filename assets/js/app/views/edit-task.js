// ### EditTaskView
// _Rendering form for editing tasks_
define([
	'jquery',
	'underscore',
	'backbone',
	'app/models/task',
	'text!app/templates/edit-task.html',
], function( $, _, Backbone, TaskModel, EditTaskTemplate ) {

	var EditTaskView = Backbone.View.extend({
		// Render each item within a div
		tagName: 'div',
		className: 'edit-task',

		template: _.template( EditTaskTemplate ),

		// Constructor
		initialize: function() { 
			this.list_model = this.model;
			this.task = new TaskModel();
		},
		
		// Listen to events on form
		events: {
			'click #edit-task-btn' : 'editTask',
			'click .cancel' : 'cancelEdit'
		},

		render: function() {
			var data = {
          todo: this.model.toJSON()
        };

			this.$el.html( this.template(data) );
			return this;
		},
		
		// Edits a task and trigger add-event on model
		editTask: function() {
			this.model.set( 'content', this.$('.task-value').val() );
			this.list_model.trigger( 'add:task', this.task );

			this.remove();
		},
		
		// Function for canceling editing a todo
		cancelEdit: function() {
			this.remove();
		}

	});

	return EditTaskView;
});