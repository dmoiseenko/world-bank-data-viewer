'use strict';

module.exports = configure;

configure.$inject = ['$stateProvider', '$urlRouterProvider'];

function configure($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '',
            abstract: true,
            template: require('./page.html'),
            controller: 'PageController',
            controllerAs: 'vm'
        })
        .state('home.data', {
            url: '/',
            views: {
                'content':{
                    template: require('./content.html')
                },
                'header': {
                    template: require('./header.html')
                },
                'footer': {
                    template: require('./footer.html')
                }
            }
        });

    $urlRouterProvider.otherwise('/');
}
