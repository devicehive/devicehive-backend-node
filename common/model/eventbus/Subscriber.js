
class Subscriber {

    constructor({ id, replyTo, correlationId }) {
        const me = this;

        me.id = id;
        me.replyTo = replyTo;
        me.correlationId = correlationId;
    }

    get id() {
        const me = this;

        return me._id;
    }

    set id(value) {
        const me = this;

        me._id = value;
    }

    get replyTo() {
        const me = this;

        return me._replyTo;
    }

    set replyTo(value) {
        const me = this;

        me._replyTo = value;
    }

    get correlationId() {
        const me = this;

        return me._correlationId;
    }

    set correlationId(value) {
        const me = this;

        me._correlationId = value;
    }
}

module.exports = Subscriber;
