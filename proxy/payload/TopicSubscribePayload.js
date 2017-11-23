
class TopicSubscribePayload {

    constructor({ topics, consumerGroup }) {
        const me = this;

        me.topics = topics;
        me.consumerGroup = consumerGroup;
    }

    get topics() {
        const me = this;
        
        return me._topics;
    }

    set topics(value) {
        const me = this;
        
        me._topics = value;
    }

    get consumerGroup() {
        const me = this;
        
        return me._consumerGroup;
    }

    set consumerGroup(value) {
        const me = this;
        
        me._consumerGroup = value;
    }

    toString() {
        const me = this;

        return JSON.stringify({
            t: me.topics,
            consumer_group: me.consumerGroup
        });
    }
}

module.exports = TopicSubscribePayload;