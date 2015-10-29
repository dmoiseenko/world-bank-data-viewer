(function () {
    'use strict';

    angular
        .module('app.chart')
        .directive('chart', chart);

    chart.$inject = [];

    function chart() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/chart/chart.html',
            scope: {},
            controller: chartController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    chartController.$inject = ['charts', '$scope'];

    function chartController(charts, $scope) {
        /* jshint validthis: true */
        var vm = this;

        vm.data = [];
        vm.options = {};
        vm.isBusy = false;

        activate();

        ////////////////

        function activate() {

            charts.plotDataObservable.subscribe(function (data) {
                if (data) {
                    $scope.$apply(function () {
                        vm.data = data.dots;
                        vm.options = data.options;
                    });

                }
            });

            charts.busyObservable
                .filter(function(isBusy){
                    return isBusy;
                })
                .subscribe(function (isBusy) {
                    vm.isBusy = isBusy;
                });

            charts.busyObservable
                .filter(function(isBusy){
                    return !isBusy;
                })
                .delay(500)
                .subscribe(function (isBusy) {
                    $scope.$apply(function () {
                        vm.isBusy = isBusy;
                    });
                });
        }
    }
})();