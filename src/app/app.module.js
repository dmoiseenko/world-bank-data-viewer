(function () {
    'use strict';

    angular
        .module('app', [

            'app.core',

            'app.filter',
            'app.chart'
        ])
        // TODO move to worldBankApi.js as  local configuration
        .config(function (RestangularProvider) {
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
            RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
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
        });
})();