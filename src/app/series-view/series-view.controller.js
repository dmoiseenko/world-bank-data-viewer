'use strict';

module.exports = seriesViewController;

seriesViewController.$inject = ['settings'];

function seriesViewController(settings) {
    var vm = this;

    vm.selectedType = '';

    vm.activate = activate;
    vm.selectType = selectType;

    activate();

    ////////////////

    function activate() {
        settings.seriesTypeObservable.subscribe(function (type) {
            vm.selectedType = type;
        })
    }

    function selectType() {
        settings.setSeriesType(vm.selectedType);
    }
}