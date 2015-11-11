'use strict';

module.exports = settings;

settings.$inject = ['rx'];

function settings(Rx) {
    var service = {
        setSeriesType: setSeriesType,
        seriesTypeObservable: new Rx.BehaviorSubject('line')
    };

    return service;

    ////////////////

    function setSeriesType(mode) {
        service.seriesTypeObservable.onNext(mode);
    }
}
