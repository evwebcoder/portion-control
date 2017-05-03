
define([
    "views/products-view/list",
    "collections/products-view/products",
    "common"

], function (
        ListProductsView,
        ProductsProductsCollection,
        Common
){
	"use strict";


	var AppRouter = Backbone.Router.extend({
    routes: {
      "": "render",
      "home": "homeView"
		},
		initialize: function (options) {
      this.appView = options.view;

      // Initialize collections
      this.listProductsCollection = new ProductsProductsCollection();
		},
		render: function () {
      // Navigate to products page which is the app home page
      //this.navigate("home", { trigger: true });
    },
		homeView: function () {
      var self = this;

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
		    }

      }
	});

  return AppRouter;
});
