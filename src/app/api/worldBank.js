'use strict';

module.exports = worldBank;

worldBank.$inject = ['Restangular'];

function worldBank(Restangular) {
    var service = {
        getCountries: getCountries,
        getTopics: getTopics,
        getIndicatorsByTopic: getIndicatorsByTopic,
        getDataByIndicator: getDataByIndicator,
        getDataByIndicatorAndCountry: getDataByIndicatorAndCountry,
        getIndicators: getIndicators,
        getData: getData,
        rest: Restangular
    };

    return service;

    ////////////////

    function getData(path){
        return Restangular.all(path).getList();
    }

    function getCountries() {
        return service.getData('countries');
    }

    function getTopics() {
        return service.getData('topics');
    }

    function getIndicatorsByTopic(topic) {
        return service.getData('topic/' + topic.id + '/indicator');
    }

    function getIndicators() {
        return service.getData('indicators');
    }

    function getDataByIndicator(indicator) {
        return service.getData('countries/all/indicators/' + indicator.id);
    }

    function getDataByIndicatorAndCountry(indicator, country) {
        return service.getData('countries/' + country.iso2Code + '/indicators/' + indicator.id);
    }
}
