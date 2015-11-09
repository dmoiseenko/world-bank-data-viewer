'use strict';

require('./_start.scss');
require('./_page.scss');
require('./_start.scss');
require('./_header.scss');

module.exports = PageController;

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
            else {
                $state.go('home.start');
            }
        });
    }
}
