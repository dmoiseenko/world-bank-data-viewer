(function() {
    'use strict';

    angular
        .module('app.filter')
        .directive('countries', countries);

    countries.$inject = [];

    function countries() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/filter/countries.html',
            scope: {
            },
            controller: countriesController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    countriesController.$inject = ['countries'];

    function countriesController(countries) {
        var vm = this;

        vm.countries = [];
        vm.searchedCountry = '';

        vm.selectCountry = selectCountry;

        activate();

        ////////////////

        function activate() {
            countries.countriesObservable
                .subscribe(function (countries) {
                    vm.countries = countries;
                });

            //observeOnScope($scope, 'vm.searchedCountry')
            //    .subscribe(function(change) {
            //    console.log(change.newValue);
            //});
        }

        function selectCountry(country) {
            countries.selectCountry(country);
        }


    }

})();