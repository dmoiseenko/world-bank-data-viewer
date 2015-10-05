(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('indicators', indicators);

    indicators.$inject = ['worldBank', 'rx'];

    function indicators(worldBank, Rx) {
        var service = {
            setTopic: setTopic,
            indicatorsObservable: new Rx.BehaviorSubject([]),
            selectIndicator: selectIndicator,
            selectedIndicatorObservable: new Rx.BehaviorSubject(null)
        };

        return service;

        ////////////////

        function selectIndicator(selectedIndicator) {
            service.selectedIndicatorObservable.onNext(selectedIndicator);
        }

        function setTopic(source) {
            if(source)
            {
                worldBank.getIndicatorsByTopic(source).then(function (indicators) {
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