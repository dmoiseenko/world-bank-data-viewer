'use strict';

module.exports = angular.module('app.selectedCountries', [])
    .directive('selectedCountries', require('./selected-countries.directive.js'));