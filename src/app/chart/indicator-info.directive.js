(function() {
    'use strict';
    
    angular
        .module('app.chart')
        .directive('indicatorInfo', indicatorInfo);
    
    function indicatorInfo () {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/chart/indicator-info.html',
            scope: {
            },
            controller: indicatorInfoController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
        
    }

    indicatorInfoController.$inject = ['indicators'];
    
    function indicatorInfoController(indicators) {
        var vm = this;

        vm.indicatorName = '';
        vm.indicatorDescription = '';

        activate();

        ////////////////

        function activate() {
            indicators.selectedIndicatorObservable.subscribe(function(selectedIndicator){
                if (selectedIndicator) {
                    vm.indicatorName = selectedIndicator.name;
                    vm.indicatorDescription  = selectedIndicator.sourceNote;
                }
                else{
                    vm.indicatorName = '';
                    vm.indicatorDescription = '';
                }

            });
        }
    }
    
})();