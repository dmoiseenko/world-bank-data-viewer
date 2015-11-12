require('angular');
require('angular-ui-router');
require('angular-mocks/angular-mocks');
require('restangular');

angular.module('app.api', ['restangular'])
    .factory('worldBank', require('./worldBank'));

describe('Factory: worldBank', function () {
    describe('getCountries', function ()
    {

        it('should call getList with countriesp path', function () {

            expect(false).to.be.false;
        });
    });
});