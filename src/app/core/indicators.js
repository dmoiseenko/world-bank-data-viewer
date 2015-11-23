'use strict';

module.exports = indicators;

indicators.$inject = ['worldBank', 'rx'];

function indicators(worldBank, Rx) {
    var service = {
        setTopic: setTopic,
        newTopicObservable: new Rx.BehaviorSubject(null),
        indicatorsObservable: new Rx.BehaviorSubject([]),
        selectIndicator: selectIndicator,
        selectedIndicatorObservable: new Rx.BehaviorSubject(null),
        loadIndicators: loadIndicators
    };

    return service;

    ////////////////

    function selectIndicator(selectedIndicator) {
        service.selectedIndicatorObservable.onNext(selectedIndicator);
    }

    function setTopic(topic) {
        service.newTopicObservable.onNext(topic);

        service.indicatorsObservable.onNext([]);
        service.selectedIndicatorObservable.onNext(null);

        if (topic) {
            worldBank.getIndicatorsByTopic(topic).then(function (indicators) {
                service.indicatorsObservable.onNext(indicators);
            });
        }
    }

    function loadIndicators() {
        worldBank.getIndicators().then(function (indicators) {
            service.indicatorsObservable.onNext(indicators);
        })
    }
}
