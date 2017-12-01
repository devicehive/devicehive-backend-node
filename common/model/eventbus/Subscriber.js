
class Subscriber {

    static get FACTORY_ID() { return 1; }
    static get CLASS_ID() { return 6; }

    static getClassName() { return Subscriber.name };

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

    getFactoryId() {
        return Subscriber.FACTORY_ID;
    };

    getClassId() {
        return Subscriber.CLASS_ID;
    };

    writePortable(writer) {
        const me = this;

    };

    readPortable(reader) {
        const me = this;

    };
}

module.exports = Subscriber;
