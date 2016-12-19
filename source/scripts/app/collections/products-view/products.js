define([
	"models/products-view/product"

], function (
        ProductsProductModel
){
	"use strict";


	var ProductsProductsCollection = Backbone.Collection.extend({
	    model: ProductsProductModel,

		// Filter down the list of all product items that are selected.
		selected: function () {
			return this.where({selected: true});
		}
	});


	return ProductsProductsCollection;
});