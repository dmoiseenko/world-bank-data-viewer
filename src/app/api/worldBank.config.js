'use strict';

module.exports = configure;

configure.$inject = ['RestangularProvider'];

function configure(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://api.worldbank.org');
    RestangularProvider.setJsonp(true);
    RestangularProvider.setDefaultRequestParams('jsonp', {
        format: 'jsonP',
        prefix: 'JSON_CALLBACK',
        per_page: 10000
    });
    RestangularProvider.setDefaultHttpFields({cache: true});
    // add a response interceptor
    RestangularProvider.addResponseInterceptor(function (data, operation) {
        var extractedData = [];
        // .. to look for getList operations
        if (operation === "getList") {
            // .. and handle the data and meta data
            if(data[1] !== null){
                extractedData = data[1];
            }
            extractedData.meta = data[0];
        } else {
            extractedData = data;
        }
        return extractedData;
    });
}
