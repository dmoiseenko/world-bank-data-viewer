(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('charts', charts);

    charts.$inject = ['worldBank', 'rx', 'plot'];

    function charts(worldBank, Rx, plot) {
        var service = {
            plotDataObservable: new Rx.BehaviorSubject(null),
            draw: draw
        };

        return service;

        ////////////////

        function draw(countries, indicator, type) {
            if (countries && indicator && countries.length !== 0) {
                Rx.Observable.from(countries)
                    .flatMap(function (country) {
                        return Rx.Observable.fromPromise(
                            worldBank.getDataByIndicatorAndCountry(indicator, country));
                    })
                    .toArray()
                    .subscribe(function (data) {
                        var plotData = plot.composePlotData(data, type);
                        service.plotDataObservable.onNext(plotData);
                    });
            }
        }
    }

})();