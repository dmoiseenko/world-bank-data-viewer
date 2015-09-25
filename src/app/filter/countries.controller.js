(function () {
    "use strict";

    angular
        .module('app.filter')
        .controller('CountriesController', CountriesController);

    CountriesController.$inject = ['$scope', 'countries'];

    function CountriesController($scope, countries) {
        var vm = this;

        vm.countries = [];
        vm.selectedCountries = [];
        vm.searchedCountry = '';

        vm.selectCountry = selectCountry;
        vm.deselectCountry = deselectCountry;

        activate();

        ////////////////

        function activate() {
            countries.countriesObservable
                .subscribe(function (countries) {
                    vm.countries = countries;
                });

            countries.selectedCountriesObservable
                .subscribe(function(selectedCountries){
                    vm.selectedCountries = selectedCountries;
                });

            //observeOnScope($scope, 'vm.searchedCountry')
            //    .subscribe(function(change) {
            //    console.log(change.newValue);
            //});
        }

        function selectCountry(country) {
            countries.selectCountry(country);
        }

        function deselectCountry(country) {
            countries.deselectCountry(country);
        }
    }

})();