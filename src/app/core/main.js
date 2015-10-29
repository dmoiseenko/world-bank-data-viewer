(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('main', main);

    main.$inject = ['countries', 'topics', 'indicators', 'charts', 'settings', 'rx'];

    function main(countries, topics, indicators, charts, settings, Rx) {
        var service = {
            start: start,
            loadingObservable: new Rx.BehaviorSubject(false)
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
                    return {
                        countries: countries,
                        source: source,
                        indicator: indicator,
                        type: type
                    };
                })
                .subscribe(function (data) {
                    if (data.countries && data.source && data.indicator && data.type) {
                        charts.draw(data.countries, data.indicator, data.type);
                        service.loadingObservable.onNext(true);
                    }
                    else {
                        service.loadingObservable.onNext(false);
                    }
                });
        }
    }

})();