(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('topics', topics);

    topics.$inject = ['worldBank'];

    function topics(worldBank) {
        var service = {
            loadTopics: getAllTopics,
            topicsObservable: new Rx.BehaviorSubject([]),
            setTopic: setTopic,
            selectedTopicObservable: new Rx.BehaviorSubject(null)
        };

        return service;

        ////////////////

        function getAllTopics()
        {
            worldBank.getTopics()
                .then(function (topic) {
                    service.topicsObservable.onNext(topic);
                });
        }

        function setTopic(source)
        {
            service.selectedTopicObservable.onNext(source);
        }
    }

})();