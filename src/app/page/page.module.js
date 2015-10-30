(function () {
    'use strict';

    angular.module('app.page', ['ui.router'])
        .config(configure);

    configure.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configure($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '',
                abstract: true,
                templateUrl: 'app/page/page.html',
                controller: 'PageController',
                controllerAs: 'vm'
            })
            .state('home.start', {
                url: '/start',
                views: {
                    'content': {
                        templateUrl: 'app/page/start.html'
                    }
                }
            })
            .state('home.data', {
                url: '/',
                views: {
                    'content': {
                        templateUrl: 'app/page/data.html'
                    }
                }
            });

        $urlRouterProvider.otherwise('/start');
    }


})();
