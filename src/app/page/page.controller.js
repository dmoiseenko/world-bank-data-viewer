'use strict';

require('./_start.scss');
require('./_page.scss');
require('./_footer.scss');
require('./_header.scss');
require('./_content.scss');

module.exports = PageController;

PageController.$inject = ['main', '$state'];

function PageController(main, $state) {
    var vm = this;

    vm.activate = activate;

    activate();

    ////////////////

    function activate() {
        main.start();
        $state.go('home.data');
    }
}
