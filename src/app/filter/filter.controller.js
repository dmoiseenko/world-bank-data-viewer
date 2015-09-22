(function () {
    "use strict";

    angular
        .module('app.filter')
        .controller('Filter', Filter);

    Filter.$inject = ['api'];

    /* @ngInject */
    function Filter(api) {
        /* jshint validthis: true */
        var vm = this;

        vm.title = 'Filter';
        vm.countries = [];
        vm.values = [];

        vm.activate = activate;
        vm.selectCountry = selectCountry;

        activate();

        ////////////////

        function activate() {
            var subject  = api.getCountriesObservable();
            subject.subscribe(function(data){
                vm.countries = data;
            });
        }

        function selectCountry(country) {
            api.selectCountry(country);
        }
    }

})();