'use strict';

module.exports = plot;

plot.$inject = ['colors'];

function plot(colors) {
    var service = {
        composePlotData: composePlotData,
        setType: setType,
        getSample: getSample
    };

    var type = 'line';

    var sampleData = {
        dots: [
            {x: 1, value: 1}
        ],
        options: {
            axes: {
                x: {key: 'x', type: 'linear', min: 0, max: 1},
                y: {type: 'linear', min: 0, max: 1, ticks: 10, grid: true}
            },
            margin: {
                left: 30,
                right: 30
            },
            series: [
                {y: 'value', drawDots: false}
            ],
            lineMode: 'linear',
            drawLegend: false
        }
    };

    return service;

    ////////////////

    function setType(selectedType) {
        type = selectedType;
    }

    function composePlotData(worldBankData) {
        var data = arrayOfArraysToArray(worldBankData)
            .filter(function (item) {
                return item.value
            });

        if (_.isEmpty(data)) {
            return getSample();
        }

        var dots = [];
        data.forEach(function (item) {
            var dot = getDotWithSameTime(dots, item);

            if (!dot) {
                dot = {};
                dots.push(dot);
            }

            dot['x'] = new Date(item.date);
            dot[item.country.id] = parseInt(item.value, 10);
        });

        dots = dots.sort(function (a, b) {
            return a['x'] - b['x'];
        });

        var axes = getAxes(data);

        var series = getSeries(data);

        var options = {
            axes: axes,
            series: series,
            drawLegend: false,
            margin: {
                left: 40,
                right: 30
            },
            tooltip: {
                mode: 'scrubber',
                formatter: function(x, y, series) {
                    return  moment(x).format('L') + ', ' + series.countryName + ' : ' + d3.format(',')(y);}
            }
        };

        return {dots: dots, options: options};
    }

    function getSample() {
        return sampleData;
    }

    function getMaxValue(data) {
        var values = data.map(function (item) {
            return item.value;
        });
        return Math.max.apply(null, values);
    }

    function arrayOfArraysToArray(array) {
        return [].concat.apply([], array);
    }

    function getUniqueCountries(data) {
        var allCountries = data.map(function (item) {
            return item.country
        });
        return _.uniq(allCountries, 'id');
    }

    function getDotWithSameTime(dots, item) {
        var itemTime = (new Date(item.date)).getTime();

        var index = _.findIndex(dots, function (dot) {
            return dot['x'].getTime() === itemTime;
        });

        if (index === -1) {
            return null;
        }

        return dots[index];
    }

    function getSeries(data) {
        var countries = getUniqueCountries(data);
        return countries.map(function (country) {
            return {
                y: country.id,
                countryName: country.value,
                color: colors.getColor(country.id),
                thickness: '3px',
                type: type
            };
        });
    }

    function getAxes(data) {
        var ticksFormat = {};
        var max = getMaxValue(data);
        if (max <= 100) {
            max = 100;
        }
        else{
            ticksFormat = 's';
        }

        return {x: {type: 'date'}, y: {grid: true, max: max, min: 0, ticksFormat: ticksFormat}};
    }
}
