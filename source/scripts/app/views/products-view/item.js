define([
    "backbone", // Call Backbone when using Underscore
	'text!templates/products-view/item.html',
    "common"

], function (
        Backbone,
		viewTemplate,
        Common
) {
	'use strict';


	var ListProductView = Backbone.View.extend({
		template: _.template(viewTemplate),
		tagName: 'div',
		className: 'product',
		events : {
		    "click input[type=checkbox]": "selectProduct",
		    "keypress input[type=checkbox]": "selectProductPressEnter",
			"change .c-qty input": "productQty",
			"click .c-qty .ui-spinner-button": "productQty",
            "keypress .c-qty input": "productQty"
		},
		render: function () {
		    this.el.innerHTML = this.template(this.model.toJSON());

		    // initialyze jQuery UI spinner
		    this.$el.find(".spinner").spinner({ min: 1 });

			return this;
		},
		selectProduct: function (evt) {
			//console.log($(evt.currentTarget).is(':checked') ? 'checked' : 'unchecked');

			// checked	condition
			if($(evt.currentTarget).is(':checked')) {
			    this.productSelected(evt);
			} // unchecked condition
			else {
			    this.productUnselected(evt);
			}
		},
		selectProductPressEnter: function(evt) {
		    // If user press ENTER key on checkbox field, we want to prevent app from jumping to next view
		    var code = evt.keyCode || evt.which;
		    if (code === Common.ENTER_KEY) {
		        return false;
		    }
		},
		productQty: function (evt) {
		    var qtyVal = $(evt.currentTarget).closest(".product").find(".c-qty input").spinner("value");

		    var code = evt.keyCode || evt.which;

		    // On keypress ENTER key, it will do the following:
		    // - update quantity value to model
		    // - then set field to CHECKED
		    // - then trigger the product select functionality
		    // - and move to next focus item (due to issues applying focus, using the _.defer function fixed that issue)
		    if (code === Common.ENTER_KEY) {
		        this.model.set({ qty: qtyVal });
		        $(evt.currentTarget).closest(".product").find(".c-check input").prop('checked', true);
		        this.productSelected(evt);
		        var currentTabindex = $(evt.currentTarget).attr("tabindex");
		        currentTabindex++;
		        _.defer(function () {
		            $('[tabindex=' + currentTabindex + ']').focus();
		        });
		        return false;
		    }

		    // Update quantity value to model
		    this.model.set({ qty: qtyVal });
		},

		productSelected: function (evt) {
		    this.model.set({ selected: true });

		    // disable item features
		    $(evt.currentTarget).closest(".product").find(".c-qty input").spinner("disable");

		    // add model to selectedView
		    //this.selectedView = new SelectedProductView({ model: this.model });
		   // $("#selected-products .list").append(this.selectedView.render().el);
		},
		productUnselected: function (evt) {
		    this.model.set({ selected: false });

		    // enable item features
		    $(evt.currentTarget).closest(".product").find(".c-qty input").spinner("enable");

		    // remove from selected view
		    this.selectedView.remove();
		}

	});


	return ListProductView;
});
