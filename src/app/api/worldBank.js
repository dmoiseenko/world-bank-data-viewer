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
        getList: getList
    };

    return service;

    ////////////////

    function getList(path){
        return Restangular.all(path).getList();
    }

    function getCountries() {
        return service.getList('countries');
    }

    function getTopics() {
        return service.getList('topics');
    }

    function getIndicatorsByTopic(topic) {
        return service.getList('topic/' + topic.id + '/indicator');
    }

    function getIndicators() {
        return service.getList('indicators');
    }

    function getDataByIndicator(indicator) {
        return service.getList('countries/all/indicators/' + indicator.id);
    }

    function getDataByIndicatorAndCountry(indicator, country) {
        return service.getList('countries/' + country.iso2Code + '/indicators/' + indicator.id);
    }
}
