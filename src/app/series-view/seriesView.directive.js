'use strict';

require('./_series-view.scss');

module.exports = seriesView;

seriesView.$inject = [];

function seriesView() {
    var directive = {
        restrict: 'EA',
        template: require('./seriesView.html'),
        scope: {},
        controller: require('./series-view.controller.js'),
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}