(function () {
    "use strict";

    angular
        .module('app.filter')
        .controller('Filter', Filter);

    Filter.$inject = ['$scope', 'countriesService', 'observeOnScope'];

    /* @ngInject */
    function Filter($scope, service, observeOnScope) {
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
            service.getCountriesObservable()
                .subscribe(function (countries) {
                    vm.countries = countries;
                });

            service.getSelectedCountriesObservable()
                .subscribe(function(selectedCountries){
                    vm.selectedCountries = selectedCountries;
                })

            observeOnScope($scope, 'vm.searchedCountry')
                .subscribe(function(change) {
                console.log(change.newValue);
            });
        }

        function selectCountry(country) {
            service.selectCountry(country);
        }

        function unselectCountry(country) {
            service.unselectCountry(country);
        }
    }

})();