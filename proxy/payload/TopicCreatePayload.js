
class TopicCreatePayload {
    constructor({ topics }) {
        const me = this;

        me.topics = topics;
    }

    get topics() {
        const me = this;

        return me._topics;
    }

    set topics(value) {
        const me = this;

        me._topics = value;
    }

    toObject() {
        const me = this;

        return me.topics;
    }

    toString() {
        const me = this;

        return JSON.stringify(me.toObject());
    }
}

module.exports = TopicCreatePayload;
