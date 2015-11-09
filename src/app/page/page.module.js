'use strict';

require('angular-ui-router');

module.exports = angular.module('app.page', ['ui.router'])
    .controller('PageController', require('./page.controller'))
    .config(require('./page.config'));