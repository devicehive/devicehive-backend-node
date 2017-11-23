
class NotificationCreatePayload {

    constructor({ topic, message, partition = 0 }) {
        const me = this;

        me.topic = topic;
        me.message = message;
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

    get message() {
        const me = this;

        return me._message;
    }

    set message(value) {
        const me = this;

        me._message = value;
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
            t: me.topic,
            m: me.message,
            part: me.partition
        });
    }
}

module.exports = NotificationCreatePayload;