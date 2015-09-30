(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('indicators', indicators);

    indicators.$inject = ['worldBank', 'rx'];

    function indicators(worldBank, Rx) {
        var service = {
            setSource: setSource,
            indicatorsObservable: new Rx.BehaviorSubject([]),
            selectIndicator: selectIndicator,
            selectedIndicatorObservable: new Rx.BehaviorSubject(null)
        };

        return service;

        ////////////////

        function selectIndicator(selectedIndicator) {
            service.selectedIndicatorObservable.onNext(selectedIndicator);
        }

        function setSource(source) {
            if(source)
            {
                worldBank.getIndicatorsBySource(source).then(function (indicators) {
                    service.indicatorsObservable.onNext(indicators);
                });
            }
            else
            {
                service.indicatorsObservable.onNext([]);
            }
        }
    }

})();