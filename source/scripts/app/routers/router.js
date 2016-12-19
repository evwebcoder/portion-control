
define([
    "views/products-view/list",
    "views/teaminfo-view/form",
    "views/attributes-view/list",
    "collections/products-view/products",
    "collections/teaminfo-view/teams",
    "collections/products-view/selection",
    "collections/attributes-view/products",
    "models/teaminfo-view/team",
    "common"

], function (
        ListProductsView,
        TeamView,
        AttributesListView,
        ProductsProductsCollection,
        TeamTeamsCollection,
        ProductsSelectionCollection,
        AttributesProductsCollection,
        TeamTeamModel,
        Common
){
	"use strict";


	var AppRouter = Backbone.Router.extend({
	    routes: {
	        "": "render",
		    "products": "productsView",
		    "team": "teamView",
            "attributes": "attributesView"
		},

		initialize: function (options) {
		    this.appView = options.view;

		    // Initialize collections
		    this.listProductsCollection = new ProductsProductsCollection();
		    App.teamsCollection = new TeamTeamsCollection();
		    App.productsSelectionCollection = new ProductsSelectionCollection();
		    App.attributesProductsCollection = new AttributesProductsCollection();
		},

		render: function () {
            // Navigate to products page which is the app home page
		    this.navigate("products", { trigger: true });
        },

		productsView: function () {
		    var self = this;

		    // Show specific element on this view
		    $(".btn-newportal").css("display", "none");

		    if (this.listProductsCollection.length == 0) {

		        // Send request to get products 
		        $.ajax({
		            url: "/Util/get-products-api.aspx",
		            type: "POST",
		            contentType: "application/json",
		            dataType: "json",
		            success: function (data) {

		                self.listProductsCollection.add(data.Items);

		                // Render PRODUCTS page view  
		                self.productsView = new ListProductsView({
		                    collection: self.listProductsCollection
		                });
		                self.appView.$el.find("main").html(self.productsView.render().el);
		                self.appView.setView("page-products");

		            },
		            error: function (jqXHR, exception) {
		                Common.getErrorMessage(jqXHR, exception);
		                $("body").scrollTop(0);
		            },
		        });

		    } else {

		        // Render PRODUCTS page view  
		        this.productsView = new ListProductsView({
		            collection: this.listProductsCollection
		        });
		        this.appView.$el.find("main").html(this.productsView.render().el);
		        this.appView.setView("page-products");

		    }
                         
		},

		teamView: function () {
            
		    // Show specific element on this view
		    $(".btn-newportal").css("display", "block");

		    // Render TEAM page view  
		    this.teamView = new TeamView({ model: new TeamTeamModel() });
		    this.appView.$el.find("main").html(this.teamView.render().el);
		    this.appView.setView("page-team");
		},

		attributesView: function () {

		    // Show specific element on this view
		    $(".btn-newportal").css("display", "block");

		    // Render ATTRIBUTES page view  
		    this.attributesView = new AttributesListView({ collection: App.attributesProductsCollection });
		    this.appView.$el.find("main").html(this.attributesView.render().el);
		    this.appView.setView("page-attributes");            
		},

		startNewSession: function () {
		    // Reset any data, to start new session
		    App.productsSelectionCollection.reset();
		    App.attributesProductsCollection.reset();
		    App.teamsCollection.reset();
		    this.listProductsCollection.reset();
		    App.router.navigate("products", { trigger: true });
		}
	});


	return AppRouter;
});
