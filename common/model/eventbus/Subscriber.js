const Long = require(`long`);


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

        writer.writeLong("id", Long.fromNumber(me.id, false));
        writer.writeUTF("replyTo", me.replyTo);
        writer.writeUTF("correlationId", me.correlationId);
    };

    readPortable(reader) {
        const me = this;

        me.id = reader.readLong("id").toNumber();
        me.replyTo = reader.readUTF("replyTo");
        me.correlationId = reader.readUTF("correlationId");
    };
}

module.exports = Subscriber;
