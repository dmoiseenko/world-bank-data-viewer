(function () {
    'use strict';

    angular
        .module('app.page')
        .controller('PageController', PageController);

    PageController.$inject = ['main'];

    function PageController(main) {
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