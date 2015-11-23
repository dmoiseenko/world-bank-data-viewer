module.exports = countriesController;

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