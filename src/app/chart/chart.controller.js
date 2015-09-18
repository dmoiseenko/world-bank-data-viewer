(function () {
    'use strict';

    angular
        .module('app.chart')
        .controller('Chart', Chart);

    Chart.$inject = ['Restangular'];

    /* @ngInject */
    function Chart(Restangular) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Chart';
        vm.change = change;
        vm.data = [
            {x: 0, value: 4, otherValue: 14},
            {x: 1, value: 8, otherValue: 1},
            {x: 2, value: 15, otherValue: 11},
            {x: 3, value: 16, otherValue: 147},
            {x: 4, value: 23, otherValue: 87},
            {x: 5, value: 42, otherValue: 45}
        ];

        vm.options = {
            axes: {
                x: {key: 'x', ticksFormat: '.2f', type: 'linear', min: 0, max: 10, ticks: 2},
                y: {type: 'linear', min: 0, max: 50, ticks: 5, innerTicks: true, grid: true}
            },
            margin: {
                left: 30
            },
            series: [
                {y: 'value', color: 'steelblue', thickness: '2px', type: 'area', striped: true, label: 'Pouet'},
                {y: 'otherValue', axis: 'y2', color: 'lightsteelblue', visible: false, drawDots: true, dotSize: 2}
            ],
            lineMode: 'linear',
            tension: 0.7,
            tooltip: {mode: 'scrubber', formatter: function(x, y, series) {return 'pouet';}},
            drawLegend: true,
            drawDots: true,
            hideOverflow: false,
            columnsHGap: 5
        };

        activate();

        ////////////////

        function activate() {
            Restangular.all('countries').getList().then(function(data){
                console.log(data);
            });
        }

        function change() {
            vm.options.axes.y.max = vm.options.axes.y.max + 10;
        }

    }

})();