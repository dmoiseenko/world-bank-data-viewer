(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('sourceService', sourceService);

    sourceService.$inject = ['worldBank'];

    /* @ngInject */
    function sourceService(worldBank) {
        var service = {
            getAllSourcesObservable: getAllSourcesSubject
        };

        var sourcesSubject  = new Rx.BehaviorSubject([]);
        var sources = [];

        activate();

        return service;

        ////////////////

        function activate()
        {
            getAllSourcesSubject().subscribe(function (data) {
                sources = data;
            });

            worldBank.getAllSources()
                .then(function (sources) {
                    getAllSourcesSubject().onNext(sources);
                });
        }

        function getAllSourcesSubject() {
            return sourcesSubject;
        }

    }

})();