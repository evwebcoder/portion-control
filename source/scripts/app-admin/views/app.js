
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
		},

		events: {
		    "click .btn-logout": "userLogout",
		    "click .btn-newportal": "startNewPortal",
		    "click .menu-flow a": "menuFlowLink",
		    "click .request-response .icon-delete": "responseClose",
            "click .btn-header-logo": "headerLogo"
		},

	    // This is called everytime a main view is render, all view transitions can be here
	    // Parameters:
	    // - bodyClassName: is the name of the HTML class for the active page
		//   the user is viewing and it gets added to the <body> tag
		setView: function (bodyClassName, menuClassName) {

		    // Remove specific class name from <body> tag 
		    // that starts with "page-" and add new class.
		    $("body").removeClass(function (index, css) {
		        return (css.match(/\page-\S+/g) || []).join(' ');
		    }).addClass(bodyClassName);

		    // Remove specific class name from <section class="view"> 
		    // tag and add active class.
		    $("section.view").removeClass(function (index, css) {
		        return (css.match(/\active-\S+/g) || []).join(' ');
		    }).addClass("active-view");

		    // Remove specific class name from menu-flow menu items 
		    // tag and add active class.
		    var buildClass = "item-" + bodyClassName;
		    $(".menu-flow li").removeClass(function (index, css) {
		        return (css.match(/\active-\S+/g) || []).join(' ');
		    }).closest("ul").find("." + buildClass).addClass("active-item");
		},

	    userLogout: function(evt) {
	        location.href = "/admin"
	        return false;
	    },

	    menuFlowLink: function (evt) {

            // !!! THIS STILL NEEDS WORK, ITS UNDER DEVELOPMENT !!!
            /*
            // Check if the item clieked is the active view
	        var getBodyClass = "item-" + $("body").attr("class").match(/page[\w-]*\b/);
	        var getMenuclass = $(".menu-flow li.active-item").attr("class").match(/item[\w-]*\b/);
	        console.log("getBodyClass: " + getBodyClass + "\ngetMenuclass: " + getMenuclass);
	        if (getBodyClass.toString() == getMenuclass.toString()) {
	            console.log("Y");
	            return false;
	        } else {
	            console.log("N");
                // 
	            var r = confirm("If you go back, you will lose the data you entered.\nAre you sure you want to continue?");
	            if (r == true) {
	                return true;
	            } else {
	                return false;
	            }
                
	        }
            */

	        return false;
	        
	    },

	    responseClose: function (evt) {
	        $(".request-response").fadeOut("fast").removeClass("response-on");

	        return false;
	    },

	    headerLogo: function (evt) {
	        return false;
	    },

	    startNewPortal: function (evt) {
	        App.router.startNewSession();
	        return false;
	    }
		
	});

	return AppView;
});

