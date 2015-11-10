'use strict';

require('./_series-view.scss');

module.exports = seriesView;

seriesView.$inject = [];

function seriesView() {
    var directive = {
        restrict: 'EA',
        template: require('./seriesView.html'),
        scope: {},
        controller: seriesViewController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

seriesViewController.$inject = ['settings'];

function seriesViewController(settings) {
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

    function selectType() {
        settings.setSeriesType(vm.selectedType);
    }
}