// ### AppView
// _Main application view_
define([
	'jquery',
	'underscore',
	'backbone',
	'app/views/list',
	'app/views/sidebar'
], function( $, _, Backbone, ListView, SidebarView ) {

	// Instansiera collectionen 
	var AppView = Backbone.View.extend({
		
		initialize: function() {
			// Event listeners
			Backbone.on( 'app:index', this.appIndex, this );
			Backbone.on( 'show:list', this.showList, this );
			Backbone.on( 'show:flashMessage', this.showFlashMessage, this );
		},
		// Render the application sidebar
		appIndex: function() {
			var sidebar = '#sidebar',
				sidebar_view = new SidebarView( { el: $( sidebar ), collection: this.collection } );

			sidebar_view.render();
		},
		
		// When 'show:list' is triggered, render ListView
		showList: function( listModel ) {
			var main = "#main",
				list_view = new ListView( { el: $( main ), model: listModel } );
			
			$( main ).empty().append( list_view.render().el );
		},

		// Shows and removes flash messages caught by the show:flashMessage event.
		//Valid messageObject:
		// {
		//  header: "Text to be shown in the header",
		//  text: "Text to be shown as the information text",
		//  type: Backbone.FLASH_TYPES.success|error|warning
		// }
		showFlashMessage: function (messageObject) {
			var messageHtml = $("<div><i></i><h2></h2><p></p></div>"),
				flashContainer = $(".flash-container"),
				symbolClass,
				messageBoxClass = "message-box ";

			//Validates the messageObjects and its attributes
			this.validateMessageObject(messageObject);

			//Sets the classes of different elements depending on what type of message it is.
			if (messageObject.type === Backbone.FLASH_TYPES.success) {
				symbolClass = 'icon-ok';
				messageBoxClass += 'success';
			} else if (messageObject.type === Backbone.FLASH_TYPES.error) {
				symbolClass = 'icon-remove';
				messageBoxClass += 'error';
			} else if (messageObject.type === Backbone.FLASH_TYPES.warning) {
				symbolClass = 'icon-warning-sign';
				messageBoxClass += 'warning';
			} else if (messageObject.type === Backbone.FLASH_TYPES.info) {
				symbolClass = 'icon-info-sign';
				messageBoxClass += 'info';
			} else {
				// ending up here means that messageObject.type was invalid.
				throw new Error("messageObject.type has to be of type Backbone.FLASH_TYPES.");
			}

			// Final touch on the html to be displayed
			messageHtml.find('i').attr('class', symbolClass);
			messageHtml.find('h2').html(messageObject.header);
			messageHtml.find('p').html(messageObject.text);
			messageHtml.attr('class', messageBoxClass);

			//Append all the html to the root element, can be found in index.html
			flashContainer.append(messageHtml);

			//Timeout to get a delay before the flash message is faded and deleted from the DOM
			setTimeout(function () {
				messageHtml.fadeOut('slow', function () {
					messageHtml.remove();
				});
			}, 2500);
		},

		validateMessageObject: function (messageObject) {
			// throws and error if messageObject isn't an object
			if (typeof(messageObject) !== "object") {
				throw new Error("messageObject has to be of type object.");
			}
			if (typeof(messageObject.text) !== "string") {
				throw new Error("messageObject.text has to be of type string.");
			}
			if (typeof(messageObject.header) !== "string") {
				throw new Error("messageObject.header has to be of type string.");
			}
		}
	});

	return AppView;
});