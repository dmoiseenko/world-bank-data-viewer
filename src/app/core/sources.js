(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('sources', sources);

    sources.$inject = ['worldBank'];

    function sources(worldBank) {
        var service = {
            loadSources: getAllSources,
            sourcesObservable: new Rx.BehaviorSubject([]),
            setSource: setSource,
            selectedSourceObservable: new Rx.BehaviorSubject(null)
        };

        return service;

        ////////////////

        function getAllSources()
        {
            worldBank.getSources()
                .then(function (sources) {
                    service.sourcesObservable.onNext(sources);
                });
        }

        function setSource(source)
        {
            service.selectedSourceObservable.onNext(source);
        }
    }

})();