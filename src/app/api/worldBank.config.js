(function () {
    'use strict';
//configure.$inject = ['RestangularProvider'];
    var api = angular.module('app.api');



    api.config(configure);
    function configure(RestangularProvider) {
        RestangularProvider.setBaseUrl('http://api.worldbank.org');
        RestangularProvider.setJsonp(true);
        // ?format=jsonP&prefix=getData
        //RestangularProvider.setDefaultRequestParams('get', {format: 'jsonP', prefix: 'getData'});
        RestangularProvider.setDefaultRequestParams('jsonp', {
            format: 'jsonP',
            prefix: 'JSON_CALLBACK',
            per_page: 10000
        });
        // add a response interceptor
        RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
            var extractedData;
            // .. to look for getList operations
            if (operation === "getList") {
                // .. and handle the data and meta data
                extractedData = data[1];
                extractedData.meta = data[0];
            } else {
                extractedData = data;
            }
            return extractedData;
        });
    }
})();
