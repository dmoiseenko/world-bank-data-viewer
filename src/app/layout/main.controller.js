(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('MainController', MainController);

    MainController.$inject = ['main'];

    function MainController(main) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'MainController';

        activate();

        ////////////////

        function activate() {
            main.start();
        }
    }

})();