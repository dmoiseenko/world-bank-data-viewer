(function () {
    'use strict';

    angular
        .module('app.api')
        .factory('worldBank', worldBank);

    worldBank.$inject = ['Restangular'];

    function worldBank(Restangular) {
        var service = {
            getCountries: getCountries,
            getSources: getSources,
            getIndicatorsBySource: getIndicatorsBySource,
            getDataByIndicator: getDataByIndicator
        };

        return service;

        ////////////////

        function getCountries() {
            return Restangular.all('countries').getList();
        }

        function getSources() {
            return Restangular.all('sources').getList();
        }

        function getIndicatorsBySource(source) {
            return Restangular.all('source/' + source.id + '/indicators').getList();
        }

        function getDataByIndicator(indicator) {
            return Restangular
                .all('countries/all/indicators/' + indicator.id)
                .getList();
        }
    }

})();