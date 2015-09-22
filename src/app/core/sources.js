(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('sources', sources);

    sources.$inject = ['worldBank'];

    /* @ngInject */
    function sources(worldBank) {
        var service = {
            sourcesObservable: new Rx.BehaviorSubject([])
        };

        var sources = [];

        activate();

        return service;

        ////////////////

        function activate()
        {
            service.sourcesObservable.subscribe(function (data) {
                sources = data;
            });

            worldBank.getSources()
                .then(function (sources) {
                    service.sourcesObservable.onNext(sources);
                });
        }
    }

})();