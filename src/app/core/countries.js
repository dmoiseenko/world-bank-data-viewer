(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('countries', countries);

    countries.$inject = ['worldBank'];

    /* @ngInject */
    function countries(worldBank) {
        var service = {
            countriesObservable: new Rx.BehaviorSubject([]),
            selectedCountriesObservable: new Rx.BehaviorSubject([]),
            countryIndicatorObservable: new Rx.BehaviorSubject([]),
            selectCountry: selectCountry,
            deselectCountry: deselectCountry
        };

        var countries = [];
        var selectedCountries = [];

        activate();

        return service;

        ////////////////

        function activate() {
            service.countriesObservable.subscribe(function (data) {
                countries = data;
            });

            worldBank.getCountries()
                .then(function (countries) {
                    service.countriesObservable.onNext(excludeRegions(countries));
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

            service.selectedCountriesObservable.onNext(selectedCountries);
            service.countriesObservable.onNext(countries);

            //Restangular
            //    .all('countries/' + country.iso2Code + '/indicators/NY.GDP.MKTP.CD')
            //    .getList()
            //    .then(function (values) {
            //        getCountryIndicatorSubject().onNext(values);
            //    });
        }

        function deselectCountry(country) {
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