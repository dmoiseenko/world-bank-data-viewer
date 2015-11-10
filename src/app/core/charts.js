'use strict';

module.exports = charts;

charts.$inject = ['worldBank', 'rx', 'plot'];

function charts(worldBank, rx, plot) {
    var service = {
        plotDataObservable: new rx.BehaviorSubject(null),
        draw: draw,
        busyObservable: new rx.BehaviorSubject(false)
    };

    return service;

    ////////////////

    function draw(countries, indicator, type) {
        if (countries && indicator && countries.length !== 0) {

            service.busyObservable.onNext(true);

            rx.Observable.from(countries)
                .flatMap(function (country) {
                    return rx.Observable.fromPromise(
                        worldBank.getDataByIndicatorAndCountry(indicator, country));
                })
                .toArray()
                .subscribe(function (data) {
                    plot.setType(type);
                    var plotData = plot.composePlotData(data);
                    service.plotDataObservable.onNext(plotData);

                    service.busyObservable.onNext(false);
                });
        }
        else {
            var plotData = plot.getSample();
            service.plotDataObservable.onNext(plotData);
        }
    }
}
