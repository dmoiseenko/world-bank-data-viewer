(function () {
    'use strict';

    angular
        .module('app.filter')
        .directive('indicators', indicators);

    indicators.$inject = [];

    function indicators() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/filter/indicators.html',
            scope: {},
            controller: IndicatorsController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    IndicatorsController.$inject = ['topics', 'indicators'];

    function IndicatorsController(topics, indicators) {
        /* jshint validthis: true */
        var vm = this;

        vm.indicators = indicators;
        vm.selectedIndicator = getNullIndicator();
        vm.selectIndicator = selectIndicator;

        activate();

        ////////////////

        function activate() {
            indicators.indicatorsObservable.subscribe(function (data) {
                vm.indicators = data;
            });

            indicators.newTopicObservable.subscribe(function (topic){
                vm.selectedIndicator = getNullIndicator();
            });
        }

        function selectIndicator(indicator) {
            vm.selectedIndicator = indicator;
            indicators.selectIndicator(indicator);
        }

        function getNullIndicator() {
            return {name: 'select indicator'}
        }

    }

})();