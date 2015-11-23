'use strict';

require('./_countries-min.scss');

module.exports = countries;

function countries() {
    var directive = {
        restrict: 'EA',
        template: require('./countries-min.html'),
        scope: {},
        controller: require('./countries.controller.js'),
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}