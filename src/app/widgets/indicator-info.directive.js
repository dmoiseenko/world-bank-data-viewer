(function() {
    'use strict';
    
    angular
        .module('app.widgets')
        .directive('indicatorInfo', indicatorInfo);
    
    function indicatorInfo () {
        var directive = {
            restrict: 'E',
            template: '<div>{{ vm.selectedIndicator.name }}</div>',
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

        vm.selectedIndicator = {};

        activate();

        ////////////////

        function activate() {
            indicators.selectedIndicatorObservable.subscribe(function(selectedIndicator){
                vm.selectedIndicator = selectedIndicator;
            });
        }
    }
    
})();