(function () {
    'use strict';

    angular
        .module('app', [

            'app.core',
            'app.api',

            'rx',
            'ui.router',

            'app.filter',
            'app.chart',

            'ui.bootstrap',
            'n3-line-chart',

        ])
        .config(function($stateProvider, $urlRouterProvider){
           $stateProvider
               .state('wbdv', {
                   url: '',
                   abstract: true
               });
            $urlRouterProvider.otherwise('/');
        });

})();