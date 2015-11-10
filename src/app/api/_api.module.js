'use strict';

require('restangular');

module.exports = angular.module('app.api', ['restangular'])
    .config(require('./worldBank.config'))
    .factory('worldBank', require('./worldBank'));