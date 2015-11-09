'use strict';

module.exports = angular.module('app.core', [])
    .factory('charts', require('./charts'))
    .factory('colors', require('./colors'))
    .factory('countries', require('./countries'))
    .factory('indicators', require('./indicators'))
    .factory('main', require('./main'))
    .factory('plot', require('./plot'))
    .factory('settings', require('./settings'))
    .factory('topics', require('./topics'));
