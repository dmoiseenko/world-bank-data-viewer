'use strict';

require('./_indicators.scss');

module.exports = indicators;

indicators.$inject = [];

function indicators() {
    var directive = {
        restrict: 'EA',
        template: require('./indicators.html'),
        scope: {},
        controller: require('./indicators.controller.js'),
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}