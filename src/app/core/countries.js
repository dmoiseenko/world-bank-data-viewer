(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('countries', countries);

    countries.$inject = ['worldBank', 'rx'];

    function countries(worldBank, Rx) {
        var service = {
            loadCountries:loadCountries,
            countriesObservable: new Rx.BehaviorSubject([]),
            selectedCountriesObservable: new Rx.BehaviorSubject([]),
            countryIndicatorObservable: new Rx.BehaviorSubject([]),
            selectCountry: selectCountry,
            deselectCountry: deselectCountry,
            setCountriesFromData: setCountriesFromData
        };

        var countries = [];
        var selectedCountries = [];

        return service;

        ////////////////

        function setCountriesFromData(data){
            var withDrawCountries = data.map(function(value){
                return value.country;
            });

            var withoutDuplicatedCountries = _.uniq(withDrawCountries);

            service.countriesObservable.onNext(withoutDuplicatedCountries);
        }

        function loadCountries() {
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
        }

        function deselectCountry(country) {
            removeCountry(selectedCountries, country);

            countries.push(country);
            sortCountriesByName(countries);

            service.selectedCountriesObservable.onNext(selectedCountries);
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