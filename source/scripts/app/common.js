
"use strict";

define([], function () {
    return {
        
        // What is the enter key constant?
        ENTER_KEY: 13,
        ESCAPE_KEY: 2,
        UP_KEY: 38,
        DOWN_KEY: 40,

        // Gloabl ajax request error messages
        getErrorMessage: function (jqXHR, exception) {
                var msgAdmin = '';
            var msgUser = 'Please contact an administrator.';
            if (jqXHR.status === 0) {
                msgAdmin = 'Not connect.\n Verify Network. ';
            } else if (jqXHR.status == 404) {
                msgAdmin = 'Requested page not found. [404]. ';
            } else if (jqXHR.status == 500) {
                msgAdmin = 'Internal Server Error [500]. ';
            } else if (exception === 'parsererror') {
                msgAdmin = 'Requested JSON parse failed. ';
            } else if (exception === 'timeout') {
                msgAdmin = 'Time out error. ';
            } else if (exception === 'abort') {
                msgAdmin = 'Ajax request aborted. ';
            } else {
                // Note that if this condition is true, its possible that it will 
                // contain an entire HTML source that will look bad on the front end
                msgAdmin = 'Uncaught Error.\n' + jqXHR.responseText;

            }
            $('.request-response p .bold').html(msgAdmin);
            $('.request-response p .msg').html(msgUser);

            $(".request-response").addClass("response-on status-error");
        },

        // Parse query string
        parseQueryString: function (queryString) {
            var params = {};

            if (queryString) {
                _.each(
                    _.map(decodeURI(queryString).split(/&/g), function (el, i) {
                        var aux = el.split('='), o = {};
                        if (aux.length >= 1) {
                            var val = undefined;
                            if (aux.length == 2)
                                val = aux[1];
                            o[aux[0]] = val;
                        }
                        return o;
                    }),
                    function (o) {
                        _.extend(params, o);
                    }
                );
            }

            return params;
        },

        // Handle console.log() statements on IE and filter them out on the production server
        consolelog: function (msg) {
            var getDomainName = window.location.hostname;
            var domains = ["3n2sports.com"]; // List domains separate by comma
            var consoleAllowed = true;
            var alertFallback = true;

            for (var i in domains) {
                if (domains[i] == getDomainName) {
                    consoleAllowed = false;
                }
            }

            if (consoleAllowed) {
                if (typeof console === "undefined" || typeof console.log === "undefined") {
                    //
                } else {
                    console.log(msg);
                }
            }
        }

    };
});
