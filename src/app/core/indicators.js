(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('indicators', indicators);

    indicators.$inject = ['worldBank'];

    /* @ngInject */
    function indicators(worldBank) {
        var service = {
            indicatorsObservable: new Rx.BehaviorSubject([]),
            setSource: setSource
        };

        var selectedSource;

        return service;

        ////////////////

        function setSource(source)
        {
            selectedSource = source;
            worldBank.getIndicatorsBySource(source).then(function (data){
                service.indicatorsObservable.onNext(data);
            });
        }
    }

})();