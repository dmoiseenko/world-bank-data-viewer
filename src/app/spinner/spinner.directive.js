'use strict';

require('./_spinner.scss');

var template = require('./spinner.html');

module.exports = spinner;

spinner.$inject = [];

function spinner () {
    var directive = {
        restrict: 'EA',
        template: template
    };

    return directive;
}