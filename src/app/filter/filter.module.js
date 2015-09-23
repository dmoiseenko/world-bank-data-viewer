(function () {
    'use strict';

    angular.module('app.filter', ['ui.router'])
        .config(['$stateProvider', function($stateProvider){
            $stateProvider
                .state('wbdv.home',{
                    url: '/',
                    views:{
                        'countries@':{
                            controller: 'CountriesController',
                            controllerAs: 'vm',
                            templateUrl: 'app/filter/countries.html'
                        },
                    }
                })
        }]);

})();

