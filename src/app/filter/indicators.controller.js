(function () {
    'use strict';

    angular
        .module('app.filter')
        .controller('IndicatorsController', IndicatorsController);

    IndicatorsController.$inject = ['topics', 'indicators'];

    function IndicatorsController(topics, indicators) {
        /* jshint validthis: true */
        var vm = this;

        vm.topics = [];
        vm.selectedTopic = getNullTopic();
        vm.selectTopic = selectTopic;

        vm.indicators = indicators;
        vm.selectedIndicator = getNullIndicator();
        vm.selectIndicator = selectIndicator;

        activate();

        ////////////////

        function activate() {
            topics.topicsObservable.subscribe(function(data){
                vm.topics = data;
            });

            indicators.indicatorsObservable.subscribe(function(data){
                vm.indicators = data;
            });
        }

        function selectTopic(topic) {
            vm.selectedTopic = topic;
            topics.setTopic(topic);
            vm.selectedIndicator = getNullIndicator();
        }

        function selectIndicator(indicator){
            vm.selectedIndicator = indicator;
            indicators.selectIndicator(indicator);
        }

        function getNullTopic(){
            return {value: 'select topic'};
        }

        function getNullIndicator(){
            return {name: 'select indicator'}
        }

    }

})();