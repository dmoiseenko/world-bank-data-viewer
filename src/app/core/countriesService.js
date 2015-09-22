(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('countriesService', countriesService);

    countriesService.$inject = ['worldBankApi'];

    /* @ngInject */
    function countriesService(api) {
        var service = {
            getCountriesObservable: getCountriesSubject,
            getSelectedCountriesObservable: getSelectedCountriesSubject,
            getCountryIndicatorObservable: getCountryIndicatorSubject,
            selectCountry: selectCountry,
            unselectCountry: unselectCountry
        };

        var countriesSubject;
        var selectedCountriesSubject;
        var countryIndicatorSubject;
        var countries = [];
        var selectedCountries = [];

        activate();

        return service;

        ////////////////

        function getCountriesSubject() {
            if (!countriesSubject) {
                countriesSubject = new Rx.BehaviorSubject([]);
            }
            return countriesSubject;
        }

        function getCountryIndicatorSubject() {
            if (!countryIndicatorSubject) {
                countryIndicatorSubject = new Rx.BehaviorSubject([]);
            }
            return countryIndicatorSubject;
        }

        function getSelectedCountriesSubject() {
            if (!selectedCountriesSubject) {
                selectedCountriesSubject = new Rx.BehaviorSubject([]);
            }
            return selectedCountriesSubject;
        }

        function activate() {
            getCountriesSubject().subscribe(function (data) {
                countries = data;
            });

            api.getAllCountries()
                .then(function (countries) {
                    getCountriesSubject().onNext(excludeRegions(countries));
                });
        }

        function excludeRegions(countries) {
            return countries.filter(function (country) {
                return country.capitalCity;
            });
        }

        function selectCountry(country) {
            removeCountry(countries, country);
            selectedCountries.push(country);
            sortCountriesByName(selectedCountries);

            getSelectedCountriesSubject().onNext(selectedCountries);
            getCountriesSubject().onNext(countries);

            //Restangular
            //    .all('countries/' + country.iso2Code + '/indicators/NY.GDP.MKTP.CD')
            //    .getList()
            //    .then(function (values) {
            //        getCountryIndicatorSubject().onNext(values);
            //    });
        }

        function unselectCountry(country) {
            removeCountry(selectedCountries, country);

            countries.push(country);
            sortCountriesByName(countries);

            getSelectedCountriesSubject().onNext(selectedCountries);
        }

        function sortCountriesByName(countries)
        {
            countries.sort(function compare(a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
        }

        function removeCountry(countries, country)
        {
            var index = countries.indexOf(country);
            if (index > -1) {
                countries.splice(index, 1);
            }
        }
    }

})();