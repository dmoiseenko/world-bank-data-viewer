'use strict';

require('./_countries.scss');
require('./_indicators.scss');

module.exports = angular.module('app.filter', [])
    .directive('countries', require('./countries.directive'))
    .directive('indicators', require('./indicators.directive'))
    .directive('selectedCountries', require('./selected-countries.directive'))
    .directive('topics', require('./topics.directive'))
    .directive('scrollbar', require('./scrollbar.directive'));

