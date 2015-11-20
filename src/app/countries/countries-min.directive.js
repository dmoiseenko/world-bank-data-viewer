'use strict';

require('./_countries-min.scss');

module.exports = countries;

function countries() {
    var directive = {
        restrict: 'EA',
        template: require('./countries-min.html'),
        scope: {},
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
    }

    function selectCountry(country) {
        countries.selectCountry(country);
    }

}
