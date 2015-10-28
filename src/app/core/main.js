(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('main', main);

    main.$inject = ['countries', 'topics', 'indicators', 'charts', 'settings'];

    function main(countries, topics, indicators, charts, settings) {
        var service = {
            start: start
        };

        return service;

        ////////////////

        function start() {

            countries.loadCountries();
            topics.loadTopics();

            topics.selectedTopicObservable.subscribe(function (source) {
                indicators.setTopic(source);
            });

            Rx.Observable.combineLatest(countries.selectedCountriesObservable,
                topics.selectedTopicObservable,
                indicators.selectedIndicatorObservable,
                settings.seriesTypeObservable,
                function (countries, source, indicator, type) {
                    charts.draw(countries, indicator, type)
                })
                .subscribe();
        }
    }

})();