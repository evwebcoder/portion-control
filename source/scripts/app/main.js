"use strict";

require.config({
	paths: {
	  "jquery": "../../libraries/jquery/jquery-3.2.1.min",
	  "underscore": "../../libraries/underscorejs/underscore-min",
		"backbone": "../../libraries/backbonejs/backbone-min",
		"text": "../../libraries/requirejs-text/text",
		"fancybox": "../../libraries/fancybox/jquery.fancybox.pack",
		"backbone-validation": "../../libraries/backbone-validation/backbone-validation-amd-min",
		"jquery-serialize-object": "../../libraries/jquery-serialize-object/jquery-serializeObject-min"
	},

	//Remember: only use shim config for non-AMD scripts,
	//scripts that do not already call define(). The shim
	//config will not work correctly if used on AMD scripts,
	//in particular, the exports and init config will not
	//be triggered, and the deps config will be confusing
	//for those cases.
	shim: {
		"backbone": {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		},
		"underscore": {
			exports: "_"
		},
		"fancybox": {
			deps: ["jquery"]
		},
		"jquery-serialize-object": {
			deps: ["jquery"]
		},
		"backbone-validation": {
			deps: ["backbone"]
		}
  }
});


require([
	"jquery",
	"jquery-serialize-object",
	"underscore",
	"backbone",
	"views/app"

], function (
        $,
        FormSerializer,
        _,
        Backbone,
        AppView
){

	$(function() {

		// Gloabl variable
		window.App = {};

		// Debug mode is to enable any custom debug features (true or false)
		App.DebugMode = false;

		// Initialize the application view
		new AppView();

	});

});
