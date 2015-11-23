'use strict';

module.exports = indicatorInfoController;

indicatorInfoController.$inject = ['indicators'];

function indicatorInfoController(indicators) {
    var vm = this;

    vm.indicatorName = '';
    vm.indicatorDescription = '';

    activate();

    ////////////////

    function activate() {
        indicators.selectedIndicatorObservable.subscribe(function (selectedIndicator) {
            if (selectedIndicator) {
                vm.indicatorName = selectedIndicator.name;
                vm.indicatorDescription = selectedIndicator.sourceNote;
            }
            else {
                vm.indicatorName = '';
                vm.indicatorDescription = '';
            }
        });
    }
}