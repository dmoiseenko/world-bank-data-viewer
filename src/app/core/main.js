(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('main', main);

    main.$inject = ['countries', 'topics', 'indicators', 'charts'];

    function main(countries, topics, indicators, charts) {
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
                indicators.selectedIndicatorObservable, function (countries, source, indicator) {
                    charts.setCountriesAndIndicator(countries, indicator)
                })
                .subscribe();

            //charts.pushSampleData();
        }


    }

})();