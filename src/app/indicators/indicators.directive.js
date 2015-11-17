'use strict';

require('./_indicators.scss');

module.exports = indicators;

indicators.$inject = [];

function indicators() {
    var directive = {
        restrict: 'EA',
        template: require('./indicators.html'),
        scope: {},
        controller: IndicatorsController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

IndicatorsController.$inject = ['indicators'];

function IndicatorsController(indicators) {
    var vm = this;

    vm.indicators = indicators;
    vm.isDisabled = true;

    vm.selectedIndicator = getNullIndicator();
    vm.selectIndicator = selectIndicator;

    activate();

    ////////////////

    function activate() {
        indicators.indicatorsObservable.subscribe(function (data) {
            vm.isDisabled = _.isEmpty(data);
            vm.indicators = data;
        });

        indicators.newTopicObservable.subscribe(function () {
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