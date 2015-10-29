(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('MainController', MainController);

    MainController.$inject = ['main'];

    function MainController(main) {
        /* jshint validthis: true */
        var vm = this;

        vm.isVisible = true;
        vm.activate = activate;

        activate();

        ////////////////

        function activate() {
            main.start();

            main.loadingObservable.subscribe(function (isLoading) {
                vm.isVisible = isLoading;
            });
        }
    }

})();