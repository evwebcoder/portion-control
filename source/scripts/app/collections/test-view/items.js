define([
	"models/test-view/item"

], function (
        TestItemModel
){
	"use strict";


	var TestItemsCollection = Backbone.Collection.extend({
		model: TestItemModel,
		url: "/source/json/test.json"
	});


	return TestItemsCollection;
});
