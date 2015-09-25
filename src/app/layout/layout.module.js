(function () {
    'use strict';

    angular.module('app.layout', ['ui.router'])
        .config(configure);

    configure.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configure($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('start', {
                url: '',
                abstract: true,
                views: {
                    'page': {
                        templateUrl: 'app/layout/page.html'
                    }
                }
            })
            .state('start.home', {
                url: '/',
                views: {
                    'countries': {
                        controller: 'CountriesController',
                        controllerAs: 'vm',
                        templateUrl: 'app/filter/countries.html'
                    },
                    'indicators': {
                        controller: 'IndicatorsController',
                        controllerAs: 'vm',
                        templateUrl: 'app/filter/indicators.html'
                    },
                    'chart': {
                        controller: 'ChartController',
                        controllerAs: 'vm',
                        templateUrl: 'app/chart/chart.html'
                    },
                    'header': {
                        templateUrl: 'app/layout/header.html'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    }


})();
