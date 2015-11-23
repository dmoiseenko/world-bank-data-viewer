indicatorsController.$inject = ['indicators'];

module.exports = indicatorsController;

function indicatorsController(indicators) {
    var vm = this;

    vm.indicators = indicators;
    vm.isDisabled = true;

    vm.selectedIndicator = getNullIndicator();
    vm.selectIndicator = selectIndicator;

    activate();

    ////////////////

    function activate() {
        indicators.indicatorsObservable.subscribe(function (data) {
            vm.isDisabled = _.isEmpty(data);
            vm.indicators = data;
        });

        indicators.selectedIndicatorObservable.subscribe(function (indicator) {
            vm.selectedIndicator = indicator;
        });

        indicators.newTopicObservable.subscribe(function () {
            vm.selectedIndicator = getNullIndicator();
        });
    }

    function selectIndicator(indicator) {
        indicators.selectIndicator(indicator);
    }

    function getNullIndicator() {
        return {name: 'select indicator'}
    }

}