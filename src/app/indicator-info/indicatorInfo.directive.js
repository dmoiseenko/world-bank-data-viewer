'use strict';

require('./_indicator-info.scss');

module.exports = indicatorInfo;

function indicatorInfo() {
    var directive = {
        restrict: 'EA',
        template: require('./indicatorInfo.html'),
        scope: {},
        controller: require('./indicator-info.controller.js'),
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

