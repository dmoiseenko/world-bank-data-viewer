(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('indicators', indicators);

    indicators.$inject = ['worldBank', 'rx'];

    function indicators(worldBank, Rx) {
        var service = {
            setTopic: setTopic,
            newTopicObservable: new Rx.BehaviorSubject(null),
            indicatorsObservable: new Rx.BehaviorSubject([]),
            selectIndicator: selectIndicator,
            selectedIndicatorObservable: new Rx.BehaviorSubject(null)
        };

        return service;

        ////////////////

        function selectIndicator(selectedIndicator) {
            service.selectedIndicatorObservable.onNext(selectedIndicator);
        }

        function setTopic(topic) {

            service.newTopicObservable.onNext(topic);

            if (topic) {
                worldBank.getIndicatorsByTopic(topic).then(function (indicators) {
                    service.indicatorsObservable.onNext(indicators);
                });
            }
            else {
                service.indicatorsObservable.onNext([]);
                service.selectedIndicatorObservable.onNext(null);
            }


        }
    }

})();