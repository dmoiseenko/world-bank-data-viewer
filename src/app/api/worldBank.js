(function () {
    'use strict';

    angular
        .module('app.api')
        .factory('worldBank', worldBank);

    worldBank.$inject = ['Restangular'];

    function worldBank(Restangular) {
        var service = {
            getCountries: getCountries,
            getTopics: getTopics,
            getIndicatorsByTopic: getIndicatorsByTopic,
            getDataByIndicator: getDataByIndicator,
            getDataByIndicatorAndCountry: getDataByIndicatorAndCountry,
            getIndicators: getIndicators
        };

        return service;

        ////////////////

        function getCountries() {
            return Restangular.all('countries').getList();
        }

        function getTopics() {
            return Restangular.all('topics').getList();
        }

        function getIndicatorsByTopic(topic) {
            return Restangular.all('topic/' + topic.id + '/indicator').getList();
        }

        function getIndicators(){
            return Restangular.all('indicators/').getList();
        }

        function getDataByIndicator(indicator) {
            return Restangular
                .all('countries/all/indicators/' + indicator.id)
                .getList();
        }

        function getDataByIndicatorAndCountry(indicator, country) {
            return Restangular
                .all('countries/' + country.iso2Code +'/indicators/' + indicator.id)
                .getList();
        }
    }

})();