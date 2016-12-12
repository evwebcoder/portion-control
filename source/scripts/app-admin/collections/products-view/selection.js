define([
	"models/products-view/selection"

], function (
        ProductsSelectionModel
) {
    "use strict";


    var ProductsSelectionCollection = Backbone.Collection.extend({
        model: ProductsSelectionModel
    });


    return ProductsSelectionCollection;
});