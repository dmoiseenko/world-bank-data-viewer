(function () {
    'use strict';

    angular
        .module('app.chart')
        .controller('Chart', Chart);

    Chart.$inject = ['api', '$timeout'];

    /* @ngInject */
    function Chart(api) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Chart';
        vm.data = [
            {x: 0, value: 4},
            {x: 1, value: 8},
            {x: 2, value: 15},
            {x: 3, value: 16},
            {x: 4, value: 23},
            {x: 5, value: 42}
        ];

        vm.countries = [];

        vm.options = {
            axes: {
                x: {key: 'x', type: 'date', min: new Date('1990-01-01T03:24:00')},
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

        activate();

        ////////////////

        function activate() {
            api.getCountryIndicatorObservable().subscribe(function (values){
                vm.data = convert(values);
            });
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