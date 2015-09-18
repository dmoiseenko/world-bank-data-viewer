(function() {
    "use strict";

    angular
        .module('app.filter')
        .controller('Filter', Filter);

    Filter.$inject = [];

    /* @ngInject */
    function Filter() {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Filter';

        vm.alerts = [
            { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
            { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
        ];

        vm.closeAlert = function(index) {
            vm.alerts.splice(index, 1);
        };


        activate();

        ////////////////

        function activate() {
        }


    }

})();