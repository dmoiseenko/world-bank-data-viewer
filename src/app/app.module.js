(function () {
    'use strict';

    angular
        .module('app', [
            'ui.bootstrap',
            'n3-line-chart',
            'app.filter',
            'app.chart',
            'restangular'
        ])
        .config(function (RestangularProvider) {
            RestangularProvider.setBaseUrl('http://api.worldbank.org');
            RestangularProvider.setDefaultRequestParams('get', {format: 'json'});
        });
})();