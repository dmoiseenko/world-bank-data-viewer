'use strict';

module.exports = angular.module('app.indicators', [])
    .directive('indicators', require('./indicators.directive.js'));