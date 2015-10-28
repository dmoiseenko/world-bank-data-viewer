(function() {
    'use strict';

    angular
        .module('app.chart')
        .directive('seriesView', seriesView);

    seriesView.$inject = [];

    function seriesView () {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/chart/seriesType.html',
            scope: {
            },
            controller: seriesViewController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    seriesViewController.$inject = ['settings'];

    function seriesViewController (settings) {
        /* jshint validthis: true */
        var vm = this;

        vm.selectedType = '';

        vm.activate = activate;
        vm.selectType = selectType

        activate();

        ////////////////

        function activate() {
            settings.seriesTypeObservable.subscribe(function (type) {
                vm.selectedType = type;
            })
        }

        function selectType(){
            settings.setSeriesType(vm.selectedType);
        }
    }

})();