'use strict';

require('angular');
require('angular-mocks');
require('lodash-custom-restangular');
require('restangular');


angular.module('app.api', ['restangular'])
    .factory('worldBank', require('./worldBank'));

describe('Factory: worldBank', function () {

    var service, restangular;

    beforeEach(function(){
        window.module('app.api');
    });

    beforeEach(inject(function (_worldBank_, _Restangular_) {
        service = _worldBank_;
        restangular = _Restangular_;
    }));

    describe('getData(path)', function(){
        it('should call getData with countries path', function () {
            spyOn(restangular, 'all').and.callThrough();
            var arg = 'asd';
            service.getData(arg);
            expect(service.rest.all).toHaveBeenCalledWith(arg);
        });
    });

    describe('getCountries', function () {
        it('should call getData with countries path', function () {
            spyOn(service, 'getData');
            service.getCountries();
            expect(service.getData).toHaveBeenCalledWith('countries');
        });
    });
    describe('getTopics', function () {
        it('should call getData with topics path', function () {
            spyOn(service, 'getData');
            service.getTopics();
            expect(service.getData).toHaveBeenCalledWith('topics');
        });
    });
    describe('getIndicatorsByTopic', function () {
        it('should call getData with countries path', function () {
            spyOn(service, 'getData');
            var topic = {id:345};
            service.getIndicatorsByTopic(topic);
            expect(service.getData).toHaveBeenCalledWith('topic/345/indicator');
        });
    });
    describe('getTopics', function () {
        it('should call getData with topics path', function () {
            spyOn(service, 'getData');
            service.getIndicators();
            expect(service.getData).toHaveBeenCalledWith('indicators');
        });
    });
    describe('getDataByIndicator', function () {
        it('should call getData with countries path', function () {
            spyOn(service, 'getData');
            var indicator = {id: 134};
            service.getDataByIndicator(indicator);
            expect(service.getData).toHaveBeenCalledWith('countries/all/indicators/134');
        });
    });
    describe('getDataByIndicator', function () {
        it('should call getData with countries path', function () {
            spyOn(service, 'getData');
            var indicator = {id: 134};
            var country = {iso2Code: 'BY'};
            service.getDataByIndicatorAndCountry(indicator, country);
            expect(service.getData).toHaveBeenCalledWith('countries/BY/indicators/134');
        });
    });
});