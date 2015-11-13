'use strict';

require('angular');
require('angular-mocks/angular-mocks');
require('lodash');

angular.module('app.chart', ['restangular'])
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
});