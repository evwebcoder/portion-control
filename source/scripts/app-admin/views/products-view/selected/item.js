define([
    "backbone", // Call Backbone when using Underscore 
	"text!templates/products-view/selected/item.html"

], function (
        Backbone,
        viewTemplate)
{
	'use strict';

	var SelectedProductView = Backbone.View.extend({
		template: _.template(viewTemplate),
		tagName: 'li',
		className: 'product',
		render: function () {
			this.el.innerHTML = this.template(this.model.toJSON());
			return this;
		}
	});


	return SelectedProductView;
});