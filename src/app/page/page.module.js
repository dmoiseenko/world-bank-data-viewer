(function () {
    'use strict';

    angular.module('app.page', ['ui.router'])
        .config(configure);

    configure.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configure($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('start', {
                url: '',
                abstract: true,
                templateUrl: 'app/page/page.html',
                controller: 'PageController',
                controllerAs: 'vm'
            })
            .state('start.home', {
                url: '/'
            });

        $urlRouterProvider.otherwise('/');
    }


})();
