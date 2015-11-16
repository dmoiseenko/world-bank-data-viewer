'use strict';

require('angular');
require('angular-mocks/angular-mocks');
require('rx');
require('rx-angular');

angular.module('app.chart', ['rx'])
    .controller('chartController', require('./chart.controller'));

describe('Controller: chartController', function () {
    beforeEach(window.module('app.chart'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('activate', function () {
        it('should fetch from charts.plotObservable', function () {
            var data = {
                dots: [
                    {x: 1, value: 1}
                ],
                options: {
                    axes: {
                        x: {key: 'x', type: 'linear', min: 0, max: 1},
                        y: {type: 'linear', min: 0, max: 1, ticks: 10, grid: true}
                    }
                }
            };
            var mockCharts = {
                plotDataObservable: new Rx.BehaviorSubject(data),
                busyObservable: new Rx.Subject()
            };
            var $scope = {};
            var controller = $controller('chartController', {charts: mockCharts, $scope: $scope});
            expect(controller.data).to.equal(data.dots);
            expect(controller.options).to.equal(data.options);
        });

        it('should fetch false from charts.busyObservable', function () {
            var mockCharts = {
                plotDataObservable: new Rx.BehaviorSubject(null),
                busyObservable: new Rx.Subject()
            };
            var $scope = {};
            var controller = $controller('chartController', {charts: mockCharts, $scope: $scope});
            mockCharts.busyObservable.onNext(false);
            expect(controller.isBusy).to.equal(false);
        });
        it('should fetch true from charts.busyObservable', function () {
            var mockCharts = {
                plotDataObservable: new Rx.BehaviorSubject(null),
                busyObservable: new Rx.Subject()
            };
            var $scope = {};
            var controller = $controller('chartController', {charts: mockCharts, $scope: $scope});
            mockCharts.busyObservable.onNext(true);
            expect(controller.isBusy).to.equal(true);
        });
    });
});