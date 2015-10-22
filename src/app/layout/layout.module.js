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
                        templateUrl: 'app/layout/page.html',
                        controller: 'MainController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('start.home', {
                url: '/',
                views: {
                    'chart': {
                        controller: 'ChartController',
                        controllerAs: 'vm',
                        templateUrl: 'app/chart/chart.html'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    }


})();
