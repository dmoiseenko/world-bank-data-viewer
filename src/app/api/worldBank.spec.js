'use strict';

require('angular');
require('angular-mocks/angular-mocks');
require('lodash-custom-restangular');
require('restangular');

angular.module('app.api', ['restangular'])
    .factory('worldBank', require('./worldBank'));

describe('Factory: worldBank', function () {
    beforeEach(window.module('app.api'));

    var service;

    beforeEach(inject(function (_worldBank_) {
        service = _worldBank_;
        spyOn(service, 'getList');
    }));

    describe('getCountries', function () {
        it('should call getList with countries path', function () {
            service.getCountries();
            expect(service.getList).toHaveBeenCalledWith('countries');
        });
    });
    describe('getTopics', function () {
        it('should call getList with topics path', function () {
            service.getTopics();
            expect(service.getList).toHaveBeenCalledWith('topics');
        });
    });
    describe('getIndicatorsByTopic', function () {
        it('should call getList with countries path', function () {
            var topic = {id:345};
            service.getIndicatorsByTopic(topic);
            expect(service.getList).toHaveBeenCalledWith('topic/345/indicator');
        });
    });
    describe('getTopics', function () {
        it('should call getList with topics path', function () {
            service.getIndicators();
            expect(service.getList).toHaveBeenCalledWith('indicators');
        });
    });
    describe('getDataByIndicator', function () {
        it('should call getList with countries path', function () {
            var indicator = {id: 134};
            service.getDataByIndicator(indicator);
            expect(service.getList).toHaveBeenCalledWith('countries/all/indicators/134');
        });
    });
    describe('getDataByIndicator', function () {
        it('should call getList with countries path', function () {
            var indicator = {id: 134};
            var country = {iso2Code: 'BY'};
            service.getDataByIndicatorAndCountry(indicator, country);
            expect(service.getList).toHaveBeenCalledWith('countries/BY/indicators/134');
        });
    });
});