'use strict';

require('n3-line-chart');

module.exports = angular.module('app.chart', ['n3-line-chart'])
    .directive('chart', require('./chart.directive'));