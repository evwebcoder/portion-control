"use strict";

require.config({
	paths: {
	    "jquery": "../../libs/jquery/jquery-3.1.1.min",
	    "underscore": "../../libs/underscorejs/underscore-min",
		"backbone": "../../libs/backbonejs/backbone-min",	
		"text": "../../libs/requirejs-text/text",
		"bootstrap": "../../libs/bootstrap/js/bootstrap.min",
		"jqueryui": "../../libs/jquery-ui-1.11.4.custom/jquery-ui.min",
		"jquery.ui.widget": "../../libs/jquery-ui-widget/jquery.ui.widget",
		"iframe-transport": "../../libs/jquery-fileupload/jquery-iframe-transport",
		"jquery-fileupload": "../../libs/jquery-fileupload/jquery-fileupload",
		"fancybox": "../../libs/fancybox/jquery.fancybox.pack",
		"backbone-validation": "../../libs/backbone-validation/backbone-validation-amd-min",
		"jquery-serialize-object": "../../libs/jquery-serialize-object/jquery-serializeObject-min",
		"backbone-stickit": "../../libs/backbone-stickit/backbone-stickit"		
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
		"bootstrap": {
			deps: ["jquery"]
		},
		"jqueryui": {
			deps: ["jquery"],
			exports: "$"
		},
		"fancybox": {
		    deps: ["jquery"]
		},
		"jquery-serialize-object": {
		    deps: ["jquery"]
		},
		"backbone-validation": {
		    deps: ["backbone"]
		},
        "backbone-stickit": {
            deps: ["jquery", "underscore", "backbone"]
        },
        
        "jquery.ui.widget": {
            deps: ["jquery"]
        },
        "iframe-transport": {
            deps: ["jquery"]
        },
        "jquery-fileupload": {
            deps: ["jquery", "jquery.ui.widget", "iframe-transport"]
        }
       
  }
});


require([
	"jquery",
    "jquery-serialize-object",
	"underscore",
	"backbone",
    "views/app",
    "bootstrap"

], function (
        $,
        FormSerializer,
        _,
        Backbone,
        AppView,
        Bootstrap
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

