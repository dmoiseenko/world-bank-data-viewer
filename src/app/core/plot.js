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

        function composePlotData(worldBankData) {
            console.log('initial data');
            console.log(worldBankData);

            var data = arrayOfArraysToArray(worldBankData)
                .filter(function (item) {
                    return item.value
                });

            var allCountries = data.map(function (item) {
                return item.country
            });
            var countries = _.uniq(allCountries, 'id');

            console.log('take out countries');
            console.log(countries);

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

            console.log('final dots');
            console.log(dots);

            var max = getMaxValueFromWorldBankData(data);

            var axes = {x: {type: 'date'}, y: {grid: true, max: max}};

            var series = countries.map(function (country) {
                return {y: country.id, color:colors.getColor(country.id), thickness: '2px'};
            });

            var options = {
                axes: axes,
                series: series,
                drawLegend: false
            };

            var plotData = {dots: dots, options: options};

            console.log(plotData);

            return plotData;
        }

        function getMaxValueFromWorldBankData(data) {
            var values = data.map(function (item) {
                return item.value;
            });
            return Math.max.apply(null, values);
        }

        function getSampleData() {
            var dots = [
                {x: 0, value: 4},
                {x: 1, value: 8},
                {x: 2, value: 15},
                {x: 3, value: 16},
                {x: 4, value: 23},
                {x: 5, value: 42}
            ];

            var options = {
                axes: {
                    x: {key: 'x', type: 'linear'},
                    y: {key: 'value', type: 'linear'}
                },
                series: [
                    {y: 'value', color: 'steelblue', thickness: '2px', type: 'area', striped: true, label: 'Pouet'}
                ],
                lineMode: 'linear',
                tension: 0.7,
                tooltip: {
                    mode: 'scrubber', formatter: function (x, y, series) {
                        return 'pouet';
                    }
                },
                drawLegend: false,
                drawDots: true,
                hideOverflow: false,
                columnsHGap: 5
            };

            return {dots: dots, options: options};
        }

        function arrayOfArraysToArray(array) {
            return [].concat.apply([], array);
        }
    }

})();