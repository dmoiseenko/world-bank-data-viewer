(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('charts', charts);

    charts.$inject = ['worldBank', 'rx', 'plot'];

    function charts(worldBank, Rx, plot) {
        var service = {
            plotDataObservable: new Rx.BehaviorSubject(null),
            draw: draw,
            busyObservable: new Rx.BehaviorSubject(false)
        };

        return service;

        ////////////////

        function draw(countries, indicator, type) {
            if (countries && indicator && countries.length !== 0) {

                service.busyObservable.onNext(true);

                Rx.Observable.from(countries)
                    .flatMap(function (country) {
                        return Rx.Observable.fromPromise(
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
            else{
                var plotData = plot.getSample();
                service.plotDataObservable.onNext(plotData);
            }
        }
    }

})();