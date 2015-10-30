(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('main', main);

    main.$inject = ['countries', 'topics', 'indicators', 'charts', 'settings', 'rx'];

    function main(countries, topics, indicators, charts, settings, Rx) {
        var service = {
            start: start,
            startObservable: new Rx.BehaviorSubject(false)
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
                    if (!_.isEmpty(data.countries) ||
                        data.source ||
                        data.indicator) {
                        service.startObservable.onNext(true);
                    }
                    else {
                        service.startObservable.onNext(false);
                    }

                    charts.draw(data.countries, data.indicator, data.type);
                });
        }
    }

})();