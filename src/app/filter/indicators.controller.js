(function () {
    'use strict';

    angular
        .module('app.filter')
        .controller('IndicatorsController', IndicatorsController);

    IndicatorsController.$inject = ['sources', 'indicators'];

    function IndicatorsController(sources, indicators) {
        /* jshint validthis: true */
        var vm = this;

        vm.sources = [];
        vm.selectedSource = getNullSource();
        vm.selectSource = selectSource;

        vm.indicators = indicators;
        vm.selectedIndicator = getNullIndicator();
        vm.selectIndicator = selectIndicator;

        activate();

        ////////////////

        function activate() {
            sources.sourcesObservable.subscribe(function(data){
                vm.sources = data;
            });

            indicators.indicatorsObservable.subscribe(function(data){
                vm.indicators = data;
            });
        }

        function selectSource(source) {
            vm.selectedSource = source;
            sources.setSource(source);
            vm.selectedIndicator = getNullIndicator();
        }

        function selectIndicator(indicator){
            vm.selectedIndicator = indicator;
            indicators.selectIndicator(indicator);
        }

        function getNullSource(){
            return {name: 'select source'};
        }

        function getNullIndicator(){
            return {name: 'select indicator'}
        }

    }

})();