(function () {
    'use strict';

    angular
        .module('app.chart')
        .controller('ChartController', ChartController);

    ChartController.$inject = ['charts'];

    function ChartController(charts) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Chart';
        vm.data = [];
        vm.options = {};

        activate();

        ////////////////

        function activate() {

            charts.plotDataObservable.subscribe(function(data){
                if(data)
                {
                    vm.title = "lampas";
                    vm.data = data.dots;
                    vm.options = data.options;
                }
            });
        }
    }

})();