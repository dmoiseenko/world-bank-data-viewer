(function () {
    'use strict';

    angular
        .module('app.filter')
        .controller('IndicatorFilter', IndicatorFilter);

    IndicatorFilter.$inject = [];

    /* @ngInject */
    function IndicatorFilter() {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Indicator';

        activate();

        ////////////////

        function activate() {
        }


    }

})();