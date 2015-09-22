(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('worldBankApi', worldBankApi);

    worldBankApi.$inject = ['Restangular'];

    /* @ngInject */
    function worldBankApi(Restangular) {
        var service = {
            getAllCountries: getAllCountries
        };

        return service;

        ////////////////

        function getAllCountries() {
            return Restangular
                .all('countries')
                .getList();
        }

        function getAllIndicators()
        {

        }

        //Restangular
        //    .all('countries/' + country.iso2Code + '/indicators/NY.GDP.MKTP.CD')
        //    .getList()
        //    .then(function (values) {
        //        getCountryIndicatorSubject().onNext(values);
        //    });

    }

})();