// ### CreateTaskView
// _Rendering form for adding tasks_
define([
	'jquery',
	'underscore',
	'backbone',
	'app/models/task',
	'text!app/templates/create-task.html',
], function( $, _, Backbone, TaskModel, CreateTaskTemplate ) {

	var CreateTaskView = Backbone.View.extend({
		// Render each item within a div
		tagName: 'div',
		className: 'row create-task',

		template: _.template( CreateTaskTemplate ),

		// Constructor
		initialize: function() { 
			this.list_model = this.model;
			this.task = new TaskModel();
		},

		events: {
			'click #create-task-btn' : 'createTask',
			'click .cancel' : 'cancelCreate'
		},

		render: function() {
			this.$el.html( this.template() );
			return this;
		},
		
		// Creates a task and trigger add-event on model
		createTask: function() {
			this.task.set( 'content', this.$('.task-content').val() );
			this.list_model.trigger( 'add:task', this.task );
		},
		
		// Function for canceling adding task
		cancelCreate: function() {
			this.remove();
		}

	});

	return CreateTaskView;
});