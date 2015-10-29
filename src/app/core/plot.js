(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('plot', plot);

    plot.$inject = ['rx', 'colors'];

    function plot(Rx, colors) {
        var service = {
            composePlotData: composePlotData
        };

        return service;

        ////////////////

        function composePlotData(worldBankData, type) {
            var data = arrayOfArraysToArray(worldBankData)
                .filter(function (item) {
                    return item.value
                });

            var allCountries = data.map(function (item) {
                return item.country
            });
            var countries = _.uniq(allCountries, 'id');

            var dots = [];

            data.forEach(function (item) {
                var index = _.findIndex(dots, function (dot) {
                    if (dot.hasOwnProperty('x')) {
                        return dot['x'].getTime() === (new Date(item.date)).getTime();
                    }
                    return false;
                });

                var dot = {};

                if (index !== -1) {
                    dot = dots[index];
                }
                else {
                    dots.push(dot);
                }
                dot['x'] = new Date(item.date);
                dot[item.country.id] = parseInt(item.value, 10);
            });

            dots = dots.sort(function (a, b) {
                return a['x'] - b['x'];
            });

            var max = getMaxValueFromWorldBankData(data);

            var axes = {x: {type: 'date'}, y: {grid: true, max: max, min: 0}};

            var series = countries.map(function (country) {
                return {y: country.id, color:colors.getColor(country.id), thickness: '2px', type: type};
            });

            var options = {
                axes: axes,
                series: series,
                drawLegend: false,
                margin:{
                    left: 30,
                    right: 30
                }
            };

            var plotData = {dots: dots, options: options};

            return plotData;
        }

        function getMaxValueFromWorldBankData(data) {
            var values = data.map(function (item) {
                return item.value;
            });
            return Math.max.apply(null, values);
        }

        function arrayOfArraysToArray(array) {
            return [].concat.apply([], array);
        }
    }

})();