'use strict';

module.exports = angular.module('app.chart', ['n3-line-chart'])
    .directive('chart', require('./chart.directive'));