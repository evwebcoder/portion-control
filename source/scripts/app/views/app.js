
define([
    "backbone", // Call Backbone when using Underscore
    "routers/router",
    "text!templates/app.html"

], function (
        Backbone,
        AppRouter,
        viewTemplate
) {
	"use strict";


	// Our overall **AppView** is the top-level piece of UI.
	var AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: "body",
		template: _.template(viewTemplate),
		initialize: function () {
      this.el.innerHTML = this.template();

      if (App.DebugMode == true) {
          $("body").addClass("debug-active");
      }

      // Initialize routing and start Backbone.history()
      App.router = new AppRouter({ view: this });
      Backbone.history.start();
    }
	});

	return AppView;
});
