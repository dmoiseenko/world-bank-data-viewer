'use strict';

//require('rx');
require('angular');


module.exports = angular.module('app', [
    'rx',

    require('./core/core.module').name,
    require('./api/api.module').name,
]);


//angular
//    .module('app', [
//
//        'app.core',
//        'app.api',
//        'app.page',
//
//        'app.filter',
//        'app.chart',
//
//        'perfect_scrollbar',
//        'rx',
//        'angular-spinkit'
//
//    ]);