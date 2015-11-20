'use strict';

require('./_indicator-info.scss');

module.exports = indicatorInfo;

function indicatorInfo() {
    var directive = {
        restrict: 'EA',
        template: require('./indicatorInfo.html'),
        scope: {},
        controller: indicatorInfoController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

indicatorInfoController.$inject = ['indicators'];

function indicatorInfoController(indicators) {
    var vm = this;

    vm.indicatorName = '';
    vm.indicatorDescription = '';
    vm.show = false;

    activate();

    ////////////////

    function activate() {
        indicators.selectedIndicatorObservable.subscribe(function (selectedIndicator) {
            if (selectedIndicator) {
                vm.indicatorName = selectedIndicator.name;
                vm.indicatorDescription = selectedIndicator.sourceNote;
                vm.show = true;
            }
            else {
                vm.indicatorName = '';
                vm.indicatorDescription = '';
                vm.show = false;
            }

        });
    }
}