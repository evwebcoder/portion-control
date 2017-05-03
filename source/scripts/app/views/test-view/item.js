define([
  "backbone", // Call Backbone when using Underscore
  "text!templates/test-view/item.html",
  "common"

], function (
  Backbone,
  viewTemplate,
  Common

) {
	"use strict";


	var ListTestView = Backbone.View.extend({
		template: _.template(viewTemplate),
		tagName: "li",
		className: "",
		events : {
		},
		render: function () {
		   this.el.innerHTML = this.template(this.model.toJSON());

       return this;
		},



	});


	return ListTestView;
});
