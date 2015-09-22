(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('api', api);

    api.$inject = ['Restangular', '$q'];

    /* @ngInject */
    function api(Restangular) {
        var service = {
            getCountriesObservable: getCountriesSubject,
            getCountryIndicatorObservable: getCountryIndicatorSubject,
            selectCountry: selectCountry
        };

        activate();

        return service;

        ////////////////

        var countriesSubject;
        function getCountriesSubject() {
            if (!countriesSubject) {
                countriesSubject = new Rx.BehaviorSubject([]);
            }
            return countriesSubject;
        }

        var countryIndicatorSubject;
        function getCountryIndicatorSubject() {
            if (!countryIndicatorSubject) {
                countryIndicatorSubject = new Rx.BehaviorSubject([]);
            }
            return countryIndicatorSubject;
        }

        function activate() {
            Restangular
                .all('countries')
                .getList()
                .then(function (countries) {
                    getCountriesSubject().onNext(excludeRegions(countries));
                });
        }

        function excludeRegions(countries) {
            return countries.filter(function (country) {
                return country.capitalCity;
            });
        }

        function selectCountry(country)
        {
            Restangular
                .all('countries/' + country.iso2Code + '/indicators/NY.GDP.MKTP.CD')
                .getList()
                .then(function (values) {
                    getCountryIndicatorSubject().onNext(values);
                });
        }
    }

})();