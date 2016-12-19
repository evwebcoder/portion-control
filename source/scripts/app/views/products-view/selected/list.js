define([
    "backbone", // Call Backbone when using Underscore 
	"views/products-view/selected/list",
	'text!templates/products-view/selected/list.html'

], function (
        Backbone,
		SelectedProductsView,
		viewTemplate
) {
	'use strict';
	
	
	var SelectedProductsView = Backbone.View.extend({
		template: _.template(viewTemplate),
		children: {},		
		render: function () {
			this.$el.html(this.template());

			return this;
		}		
	});


	return SelectedProductsView;
});
