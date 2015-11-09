'use strict';



module.exports = angular.module('app.chart', ['n3-line-chart'])
    .directive('chart', require('./chart.directive'))
    .directive('indicatorInfo', require('./indicatorInfo.directive'))
    .directive('seriesView', require('./seriesView.directive'))
    .directive('spinner', require('./spinner.directive'));