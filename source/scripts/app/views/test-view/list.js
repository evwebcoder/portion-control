define([
  "backbone", // Call Backbone when using Underscore
  "text!templates/test-view/list.html",
  "views/test-view/item",
  "collections/test-view/items",
  "common"

], function (
  Backbone,
  viewTemplate,
  TestItemView,
  TestItemsCollection,
  Common

) {
	"use strict";


	var TestItemsView = Backbone.View.extend({
    template: _.template(viewTemplate),
    tagName: "ul",
    className: "type-items",
    initialize: function (options) {

		},
		events: {

		},
		children: {},
		render: function () {
      this.el.innerHTML = this.template();
      var self = this;

      this.collection.fetch({
        success: function(data) {
          console.log("JSON file load was successful", data);

          self.collection.each(self.addItem.bind(self));
        },
        error: function(){
          console.log("There was some error in loading and processing the JSON file");
        }
      });

			return this;
		},
		addItem: function (model) {
      this.children[model.cid] = new TestItemView({ model: model });
      this.$el.append(this.children[model.cid].render().el);
		}
	});


	return TestItemsView;
});
