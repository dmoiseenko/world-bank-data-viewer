'use strict';

require('angular');
require('angular-mocks/angular-mocks');
require('lodash');
var restangular = require('restangular');

angular.module('app.api', ['restangular'])
    .factory('worldBank', require('./worldBank'));

describe('Factory: worldBank', function () {
    beforeEach(window.module('app.api'));

    var service;

    beforeEach(inject(function (_worldBank_) {
        service = _worldBank_;
        sinon.spy(service, 'getList');
    }));

    describe('getCountries', function () {
        it('should call getList with countries path', function () {
            service.getCountries();
            expect(service.getList.getCall(0).args[0])
                .to.equal('countries');
        });
    });
    describe('getTopics', function () {
        it('should call getList with topics path', function () {
            service.getTopics();
            expect(service.getList.getCall(0).args[0])
                .to.equal('topics');
        });
    });
    describe('getIndicatorsByTopic', function () {
        it('should call getList with countries path', function () {
            var topic = {id:345};
            service.getIndicatorsByTopic(topic);
            expect(service.getList.getCall(0).args[0])
                .to.equal('topic/345/indicator');
        });
    });
    describe('getTopics', function () {
        it('should call getList with topics path', function () {
            service.getIndicators();
            expect(service.getList.getCall(0).args[0])
                .to.equal('indicators');
        });
    });
    describe('getDataByIndicator', function () {
        it('should call getList with countries path', function () {
            var indicator = {id: 134};
            service.getDataByIndicator(indicator);
            expect(service.getList.getCall(0).args[0])
                .to.equal('countries/all/indicators/134');
        });
    });
    describe('getDataByIndicator', function () {
        it('should call getList with countries path', function () {
            var indicator = {id: 134};
            var country = {iso2Code: 'BY'};
            service.getDataByIndicatorAndCountry(indicator, country);
            expect(service.getList.getCall(0).args[0])
                .to.equal('countries/BY/indicators/134');
        });
    });
});