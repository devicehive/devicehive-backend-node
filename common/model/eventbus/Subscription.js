
class Subscription {

    static get FACTORY_ID() { return 1; }
    static get CLASS_ID() { return 5; }

    static getClassName() { return Subscription.name };

    constructor({ networkId, deviceTypeId, deviceId, eventType, name } = {}) {
        const me = this;

        me.networkId = networkId;
        me.deviceTypeId = deviceTypeId;
        me.deviceId = deviceId;
        me.eventType = eventType;
        me.name = name;
    }

    get networkId() {
        const me = this;

        return me._networkId;
    }

    set networkId(value) {
        const me = this;

        me._networkId = value;
    }

    get deviceTypeId() {
        const me = this;

        return me._deviceTypeId;
    }

    set deviceTypeId(value) {
        const me = this;

        me._deviceTypeId = value;
    }

    get deviceId() {
        const me = this;

        return me._deviceId;
    }

    set deviceId(value) {
        const me = this;

        me._deviceId = value;
    }

    get eventType() {
        const me = this;

        return me._eventType;
    }

    set eventType(value) {
        const me = this;

        me._eventType = value;
    }

    get name() {
        const me = this;

        return me._name;
    }

    set name(value) {
        const me = this;

        me._name = value;
    }

    getFactoryId() {
        return Subscription.FACTORY_ID;
    };

    getClassId() {
        return Subscription.CLASS_ID;
    };

    writePortable(writer) {
        const me = this;

        writer.writeUTF("networkId", me.networkId);
        writer.writeUTF("deviceTypeId", me.deviceTypeId);
        writer.writeUTF("deviceId", me.deviceId);
        writer.writeUTF("eventType", me.eventType);
        writer.writeUTF("name", me.name);
    };

    readPortable(reader) {
        const me = this;

        reader.readUTF("networkId", me.networkId);
        reader.readUTF("deviceTypeId", me.deviceTypeId);
        reader.readUTF("deviceId", me.deviceId);
        reader.readUTF("eventType", me.eventType);
        reader.readUTF("name", me.name);
    };
}

module.exports = Subscription;
