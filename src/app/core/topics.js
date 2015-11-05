'use strict';

module.exports = topics;

topics.$inject = ['worldBank'];

function topics(worldBank) {
    var service = {
        loadTopics: getAllTopics,
        topicsObservable: new Rx.BehaviorSubject([]),
        setTopic: setTopic,
        selectedTopicObservable: new Rx.BehaviorSubject(null)
    };

    var selectedTopic = null;

    return service;

    ////////////////

    function getAllTopics() {
        worldBank.getTopics()
            .then(function (topic) {
                service.topicsObservable.onNext(topic);
            });
    }

    function setTopic(topic) {
        if (isTopicSelected()) {
            if (topic.id === selectedTopic.id) {
                return;
            }
        }

        selectedTopic = topic;
        service.selectedTopicObservable.onNext(topic);
    }

    function isTopicSelected() {
        return !_.isNull(selectedTopic);
    }
}