(function () {
    'use strict';

    angular
        .module('app.api')
        .factory('worldBank', worldBank);

    worldBank.$inject = ['Restangular'];

    /* @ngInject */
    function worldBank(Restangular) {
        var service = {
            getCountries: getCountries,
            getSources: getSources,
            getIndicatorsBySource: getIndicatorsBySource
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
            return Restangular.all('source/'+ source.id +'/indicators').getList();
        }

        //Restangular
        //    .all('countries/' + country.iso2Code + '/indicators/NY.GDP.MKTP.CD')
        //    .getList()
        //    .then(function (values) {
        //        getCountryIndicatorSubject().onNext(values);
        //    });

    }

})();