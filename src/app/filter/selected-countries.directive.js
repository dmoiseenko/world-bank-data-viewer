(function() {
    'use strict';

    angular
        .module('app.filter')
        .directive('selectedCountries', selectedCountries);

    selectedCountries.$inject = [];

    function selectedCountries () {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/filter/selected-countries.html',
            scope: {
            },
            controller: selectedCountriesController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    selectedCountriesController.$inject = ['countries'];

    function selectedCountriesController (countries) {
        /* jshint validthis: true */
        var vm = this;
        vm.selectedCountries = [];

        vm.deselectCountry = deselectCountry;

        activate();

        ////////////////

        function activate() {
            countries.selectedCountriesObservable
                .subscribe(function(selectedCountries){
                    vm.selectedCountries = selectedCountries;
                });
        }

        function deselectCountry(country) {
            countries.deselectCountry(country);
        }

    }

})();