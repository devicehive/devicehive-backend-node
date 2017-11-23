
class TopicListPayload {

    constructor({ topicInfos }) {
        const me = this;

        me.topicInfos = topicInfos;
    }

    get topicInfos() {
        const me = this;

        return me._topicInfos;
    }

    set topicInfos(value) {
        const me = this;

        me._topicInfos = value;
    }

    toString() {
        const me = this;

        return JSON.stringify({
            topicInfos: me.topicInfos.map((topicInfo) => (new TopicInfo(topicInfo)).toString())
        });
    }
}

class TopicInfo {

    constructor({ topic, partition }) {
        const me = this;

        me.topic = topic;
        me.partition = partition;
    }

    get topic() {
        const me = this;

        return me._topic;
    }

    set topic(value) {
        const me = this;

        me._topic = value;
    }

    get partition() {
        const me = this;

        return me._partition;
    }

    set partition(value) {
        const me = this;

        me._partition = value;
    }

    toString() {
        const me = this;

        return JSON.stringify({
            topic: me.topic,
            partition: me.partition
        });
    }
}

module.exports = TopicListPayload;