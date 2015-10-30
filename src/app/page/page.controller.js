(function () {
    'use strict';

    angular
        .module('app.page')
        .controller('PageController', PageController);

    PageController.$inject = ['main', '$state'];

    function PageController(main, $state) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;

        activate();

        ////////////////

        function activate() {
            main.start();

            main.startObservable.subscribe(function (isStarted) {

                if (isStarted) {
                    $state.go('home.data');
                }
                else{
                    $state.go('home.start');
                }
            });
        }
    }

})();