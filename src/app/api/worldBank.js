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
        return getList('countries');
    }

    function getTopics() {
        return getList('topics');
    }

    function getIndicatorsByTopic(topic) {
        return getList('topic/' + topic.id + '/indicator');
    }

    function getIndicators() {
        return getList('indicators/');
    }

    function getDataByIndicator(indicator) {
        return getList('countries/all/indicators/' + indicator.id);
    }

    function getDataByIndicatorAndCountry(indicator, country) {
        return getList('countries/' + country.iso2Code + '/indicators/' + indicator.id);
    }
}
