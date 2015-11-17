'use strict';

module.exports = main;

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
        //load trade topic
        indicators.setTopic({id: 21});

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
                charts.draw(data.countries, data.indicator, data.type);
            });
    }
}
