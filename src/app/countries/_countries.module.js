'use strict';

module.exports = angular.module('app.countries', [])
    .directive('countries', require('./../countries/countries.directive.js'));