module.exports = chartController;

chartController.$inject = ['charts', '$timeout'];

function chartController(charts, $timeout) {
    var vm = this;

    vm.data = [];
    vm.options = {};
    vm.isBusy = false;

    activate();

    ////////////////

    function activate() {

        charts.plotDataObservable.subscribe(function (data) {
            if (data) {
                vm.data = data.dots;
                vm.options = data.options;
            }
        });

        charts.busyObservable
            .subscribe(function (isBusy) {
                if (isBusy) {
                    vm.isBusy = true;
                }
                else {
                    $timeout(function () {
                        vm.isBusy = false;
                    }, 500);
                }

            });
    }
}