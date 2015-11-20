'use strict';

module.exports = angular.module('app.countries', [])
    .directive('countries', require('./countries.directive.js'))
    .directive('countriesMin', require('./countries-min.directive.js'));