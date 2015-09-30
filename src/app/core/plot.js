(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('plot', plot);

    plot.$inject = [];

    function plot() {
        var service = {
            composePlotData: composePlotData
        };

        return service;

        ////////////////

        function composePlotData(worldBankData) {

            var dots = worldBankData
                .filter(function(item){
                    return item.value;
                })
                .map(function(item){
               return {x: new Date(item.date), value: item.value};
            });

            var options = {
                axes: {
                    x: {key: 'x', type: 'date'},
                    y: {key: 'value', type: 'linear'}
                },
                series: [
                    {y: 'value', color: 'steelblue', thickness: '3px', label: 'Pouet'}
                ],
                lineMode: 'linear',
                tension: 0.7,
                tooltip: {mode: 'scrubber', formatter: function(x, y, series) {return 'pouet';}},
                drawLegend: false,
                drawDots: true,
                hideOverflow: false,
                columnsHGap: 5
            };

            var plotData = {dots: dots, options:options};

            console.log(plotData);

            return plotData;
        }

        function getSampleData(){
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
                tooltip: {mode: 'scrubber', formatter: function(x, y, series) {return 'pouet';}},
                drawLegend: false,
                drawDots: true,
                hideOverflow: false,
                columnsHGap: 5
            };

            return {dots: dots, options:options};
        }

        function convert(values){
            var data = [];
            values.map(function(value){
                var point  = {x: new Date(value.date), value: value.value/100000000};
                if(point.value)
                {
                    data.push(point)
                }
            });

            return data;
        }

    }

})();