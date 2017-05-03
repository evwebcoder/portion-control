
define([
    "views/test-view/list",
    "collections/test-view/items",
    "common"

], function (
        TestItemsView,
        TestItemsCollection,
        Common
){
	"use strict";


	var AppRouter = Backbone.Router.extend({
    routes: {
      "": "render",
      "test": "testView"
		},
		initialize: function (options) {
      this.appView = options.view;

      // Initialize collections
      this.testItemsCollection = new TestItemsCollection();
		},
		render: function () {
      // Navigate to products page which is the app home page
      this.navigate("test", { trigger: true });
    },
		testView: function () {
      var self = this;

      var dummy_date = [
          {
            "name": "Apple"
          },
          {
            "name": "Orange"
          },
          {
            "name": "Banana"
          }
      ];

      //this.testItemsCollection.add(dummy_date);

      this.itemsView = new TestItemsView({
          collection: this.testItemsCollection
      });

      this.appView.$el.find("main").html(this.itemsView.render().el);

    }
	});

  return AppRouter;
});
