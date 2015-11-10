'use strict';

module.exports = angular.module('app.filter', [])
    .directive('topics', require('./topics.directive'));

