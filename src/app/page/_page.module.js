'use strict';

module.exports = angular.module('app.page', ['ui.router'])
    .controller('PageController', require('./page.controller'))
    .config(require('./page.config'));