define([
    "backbone", // Call Backbone when using Underscore
    'text!templates/products-view/list.html',
	"views/products-view/item",
	"collections/products-view/products",
    "common"

], function (
        Backbone,
        viewTemplate,
		ListProductView,
		ListProductsCollection,
        Common

) {
	"use strict";


	var ListProductsView = Backbone.View.extend({
	    template: _.template(viewTemplate),
        tagName: "section",
	    className: "view type-products",
	    initialize: function (options) {
	        /* this.productsSelectionCollection = options.productsSelectionCollection;
	        this.productsSetupCollection = options.productSetupCollection; */
		    this.listenTo(this.collection, "change", this.updateSelectedCount);

		},
		events: {
		    "click .btn-next": "nextStep"
		},
		children: {},
		render: function () {
		    var self = this;

		    this.el.innerHTML = this.template();

		    // Initialize selectedProductView
		    //this.selectedView = new SelectedProductsView();
		    //this.$el.find("#selected-products").html(this.selectedView.render().el);

		    this.tabindexCount = 1;

            // Render products
			this.collection.each(this.addProduct.bind(this));

		    // After all products are render, set focus on first product.
			// Due to issues applying focus, using the _.defer function fixed that issue
			_.defer(function () {
			    self.$el.find(".product").eq(0).find(".c-qty input").focus();
			});

			return this;
		},
		addProduct: function (model) {
		    this.children[model.cid] = new ListProductView({ model: model });

		    // Append new model attributes
		    this.children[model.cid].model.set({ qty: 1, selected: false, customTabindex: this.tabindexCount });

		    this.$el.find("#list-products .list").append(this.children[model.cid].render().el);

		    this.tabindexCount++;
		},

		// Update count on selected items section
		updateSelectedCount: function () {

		    $("#selected-products").find('h2 .count').text(this.collection.selected().length);

		    if (this.collection.selected().length >= 1) {
		        this.$el.find(".btn-next").prop("disabled", false);
		    } else if (this.collection.selected().length == 0) {
		        this.$el.find(".btn-next").prop("disabled", true);
		    }
		},
		nextStep: function (evt) {
		    var self = this;

		    // Iterate through the products collection to create clone models
		    // from each selected product model quantity attribute
		    this.collection.each(function (item) {
		        if (item.get("selected") == true) {
		            if (item.get("qty") > 1) {
		                for (var i = 0; i < item.get("qty") ; i++) {
		                    App.productsSelectionCollection.add(item.attributes);
		                }
		            } else {
		                App.productsSelectionCollection.add(item);
		            }
		        }
		    }, this);

		    // Push in JS object and convert JS object to JSON
		    var json_obj_data = {
		        Items: App.productsSelectionCollection
		    };
		    var json_data = JSON.stringify(json_obj_data);

		    // Disable button
		    $(evt.currentTarget).html("Please wait ...");
		    $(evt.currentTarget).prop('disabled', true);

		    // Send request to get attribute data from JSON file for all selected products
		    $.ajax({
		        url: "/Util/get-products-attributes.aspx",
		        type: "POST",
		        contentType: "application/json",
		        data: json_data,
		        dataType: "json",
		        success: function (data) {

		            // Update attributes view list Collection with new data including attributes
		            App.attributesProductsCollection.add(data.Items);

                    // Render next view
		            App.router.navigate("team", { trigger: true });

		        },
		        error: function (jqXHR, exception) {
		            Common.getErrorMessage(jqXHR, exception);
		            $("body").scrollTop(0);
		        },
		        complete: function (response) {
		            // Enable button back
		            $(evt.currentTarget).html("NEXT: TEAM INFO");
		            $(evt.currentTarget).prop('disabled', false);
		        }
		    });

		    return false;
		}
	});


	return ListProductsView;
});
