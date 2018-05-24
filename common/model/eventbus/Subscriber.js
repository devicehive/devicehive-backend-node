const HazelcastPortable = require(`../HazelcastPortable`);
const Long = require(`long`);


class Subscriber extends HazelcastPortable {

    static get FACTORY_ID() { return 1; }
    static get CLASS_ID() { return 6; }

    static getClassName() { return Subscriber.name }

    constructor({ id, replyTo, correlationId }) {
        super();

        const me = this;

        me.id = id;
        me.replyTo = replyTo;
        me.correlationId = correlationId;
    }

    toString() {
        const me = this;

        return JSON.stringify({
            id: me.id,
            replyTo: me.replyTo,
            correlationId: me.correlationId
        });
    }

    getFactoryId() {
        return Subscriber.FACTORY_ID;
    }

    getClassId() {
        return Subscriber.CLASS_ID;
    }

    writePortable(writer) {
        const me = this;

        writer.writeLong("id", Long.fromNumber(me.id, false));
        writer.writeUTF("replyTo", me.replyTo);
        writer.writeUTF("correlationId", me.correlationId);
    }

    readPortable(reader) {
        const me = this;

        me.id = reader.readLong("id").toNumber();
        me.replyTo = reader.readUTF("replyTo");
        me.correlationId = reader.readUTF("correlationId");
    }
}

module.exports = Subscriber;
