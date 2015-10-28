(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('settings', settings);

    settings.$inject = ['rx'];

    function settings(rx) {
        var service = {
            setSeriesType: setSeriesType,
            seriesTypeObservable: new Rx.BehaviorSubject('line'),
        };

        return service;

        ////////////////

        function setSeriesType(mode) {
            service.seriesTypeObservable.onNext(mode);
        }
    }

})();