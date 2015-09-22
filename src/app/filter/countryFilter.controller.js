(function () {
    "use strict";

    angular
        .module('app.filter')
        .controller('CountryFilter', CountryFilter);

    CountryFilter.$inject = ['$scope', 'countryService'];

    /* @ngInject */
    function CountryFilter($scope, countryService) {
        /* jshint validthis: true */
        var vm = this;

        vm.countries = [];
        vm.selectedCountries = [];
        vm.values = [];
        vm.searchedCountry = '';

        vm.activate = activate;
        vm.selectCountry = selectCountry;
        vm.unselectCountry = unselectCountry;

        activate();

        ////////////////

        function activate() {
            countryService.getCountriesObservable()
                .subscribe(function (countries) {
                    vm.countries = countries;
                });

            countryService.getSelectedCountriesObservable()
                .subscribe(function(selectedCountries){
                    vm.selectedCountries = selectedCountries;
                })

            //observeOnScope($scope, 'vm.searchedCountry')
            //    .subscribe(function(change) {
            //    console.log(change.newValue);
            //});
        }

        function selectCountry(country) {
            countryService.selectCountry(country);
        }

        function unselectCountry(country) {
            countryService.unselectCountry(country);
        }
    }

})();