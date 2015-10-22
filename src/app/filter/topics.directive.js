(function() {
    'use strict';

    angular
        .module('app.filter')
        .directive('topics', topics);

    topics.$inject = [];

    function topics () {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/filter/topics.html',
            scope: {
            },
            controller: topicsController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    topicsController.$inject = ['topics'];

    function topicsController(topics) {
        /* jshint validthis: true */
        var vm = this;

        vm.topics = [];
        vm.selectedTopic = getNullTopic();
        vm.selectTopic = selectTopic;

        vm.activate = activate;

        activate();

        ////////////////

        function activate() {
            topics.topicsObservable.subscribe(function (data) {
                vm.topics = data;
            });
        }

        function getNullTopic() {
            return {value: 'select topic'};
        }

        function selectTopic(topic) {
            vm.selectedTopic = topic;
            topics.setTopic(topic);
            //todo
            //vm.selectedIndicator = getNullIndicator();
        }

    }

})();