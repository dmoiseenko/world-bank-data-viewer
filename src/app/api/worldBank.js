(function () {
    'use strict';

    angular
        .module('app.api')
        .factory('worldBank', worldBank);

    worldBank.$inject = ['Restangular'];

    /* @ngInject */
    function worldBank(Restangular) {
        var service = {
            getAllCountries: getAllCountries,
            getAllSources: getAllSources
        };

        return service;

        ////////////////

        function getAllCountries() {
            return Restangular.all('countries').getList();
        }

        function getAllSources() {
            return Restangular.all('sources').getList();
        }

        //Restangular
        //    .all('countries/' + country.iso2Code + '/indicators/NY.GDP.MKTP.CD')
        //    .getList()
        //    .then(function (values) {
        //        getCountryIndicatorSubject().onNext(values);
        //    });

    }

})();