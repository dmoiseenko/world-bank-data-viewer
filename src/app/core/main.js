(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('main', main);

    main.$inject = ['countries', 'sources', 'indicators', 'charts'];

    function main(countries, sources, indicators, charts) {
        var service = {
            start: start
        };

        return service;

        ////////////////

        function start() {

            countries.loadCountries();
            sources.loadSources();

            sources.selectedSourceObservable.subscribe(function (source) {
                indicators.setSource(source);
            });

            charts.dataObservable.subscribe(function (data) {
                console.log(data);
            });

            Rx.Observable.combineLatest(countries.selectedCountriesObservable,
                sources.selectedSourceObservable,
                indicators.selectedIndicatorObservable, function (countries, source, indicator) {
                    charts.setCountriesAndIndicator(countries, indicator)
                })
                .subscribe();
        }


    }

})();