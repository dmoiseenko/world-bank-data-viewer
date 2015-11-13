'use strict';

require('./_chart.scss');

module.exports = chart;

chart.$inject = [];

function chart() {
    var directive = {
        restrict: 'EA',
        template: require('./chart.html'),
        scope: {},
        controller: require('./chart.controller'),
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}