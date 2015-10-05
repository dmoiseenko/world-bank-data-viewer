(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('charts', charts);

    charts.$inject = ['worldBank', 'rx', 'plot'];

    function charts(worldBank, Rx, plot) {
        var service = {
            plotDataObservable: new Rx.BehaviorSubject(null),
            setCountriesAndIndicator: setCountriesAndIndicator,
            pushSampleData: pushSampleData
        };

        return service;

        ////////////////

        function setCountriesAndIndicator(countries, indicator) {
            if (countries && indicator && countries.length !== 0) {

                Rx.Observable.from(countries)
                    .flatMap(function (country) {
                        return Rx.Observable.fromPromise(
                            worldBank.getDataByIndicatorAndCountry(indicator, country));
                    })
                    .toArray()
                    .subscribe(function (data) {
                        var plotData = plot.composePlotData(data);
                        service.plotDataObservable.onNext(plotData);
                    });
            }
        }

        function pushSampleData() {
            var data = [[{
                "indicator": {"id": "AG.PRD.CREL.MT", "value": "Cereal production (metric tons)"},
                "country": {"id": "AM", "value": "Armenia"},
                "value": 10,
                "decimal": "1",
                "date": "2015"
            },
                {
                    "indicator": {"id": "AG.PRD.CREL.MT", "value": "Cereal production (metric tons)"},
                    "country": {"id": "AM", "value": "Armenia"},
                    "value": 2,
                    "decimal": "0",
                    "date": "2014"
                }],
                [{
                    "indicator": {"id": "AG.PRD.CREL.MT", "value": "Cereal production (metric tons)"},
                    "country": {"id": "AR", "value": "Argentina"},
                    "value": "5",
                    "decimal": "0",
                    "date": "2015"
                },
                    {
                        "indicator": {"id": "AG.PRD.CREL.MT", "value": "Cereal production (metric tons)"},
                        "country": {"id": "AR", "value": "Argentina"},
                        "value": "13",
                        "decimal": "0",
                        "date": "2014"
                    }]];
            var plotData = plot.composePlotData(data)
            service.plotDataObservable.onNext(plotData);
        }
    }

})();