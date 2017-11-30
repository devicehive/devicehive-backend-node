const Long = require(`long`);

class DeviceNotification {

    static get serialVersionUID() { return 1834383778016225837; }
    static get FACTORY_ID() { return 1; }
    static get CLASS_ID() { return 1; }

    static getClassName() { return DeviceNotification.name };

    constructor({ id, notification, deviceId, networkId, timestamp, parameters } = {}) {
        const me = this;

        me.id = id;
        me.notification = notification;
        me.deviceId = deviceId;
        me.networkId = networkId;
        me.timestamp = timestamp;
        me.parameters = parameters;
    }

    get id() {
        const me = this;

        return me._id;
    }

    set id(value) {
        this._id = value;
    }

    get notification() {
        const me = this;

        return me._notification;
    }

    set notification(value) {
        this._notification = value;
    }

    get deviceId() {
        const me = this;

        return me._deviceId;
    }

    set deviceId(value) {
        this._deviceId = value;
    }

    get networkId() {
        const me = this;

        return me._networkId;
    }

    set networkId(value) {
        this._networkId = value;
    }

    get timestamp() {
        const me = this;

        return me._timestamp;
    }

    set timestamp(value) {
        this._timestamp = value;
    }

    get parameters() {
        const me = this;

        return me._parameters;
    }

    set parameters(value) {
        this._parameters = value;
    }

    toObject() {
        const me = this;

        return {
            id: me.id,
            notification: me.notification,
            deviceId: me.deviceId,
            networkId: me.networkId,
            timestamp: me.timestamp,
            parameters: me.parameters
        }
    }

    getHazelcastKey() {
        const me = this;

        return `${me.id}-${me.deviceId}-${me.timestamp}`;
    }

    getFactoryId() {
        return DeviceNotification.FACTORY_ID;
    };

    getClassId() {
        return DeviceNotification.CLASS_ID;
    };

    writePortable(writer) {
        const me = this;

        //writer.writeLong("id", Long.fromNumber(me.id, true));
        writer.writeDouble("id", me.id, true);
        writer.writeUTF("notification", me.notification);
        writer.writeUTF("deviceId", me.deviceId);
        //writer.writeLong("networkId", Long.fromNumber(me.networkId, true));
        writer.writeDouble("networkId", me.networkId, true);
        //writer.writeLong("timestamp", Long.fromNumber(new Date(me.timestamp).getTime(), true));
        writer.writeDouble("timestamp", new Date(me.timestamp).getTime(), true);
        writer.writeUTF("parameters", JSON.stringify(me.parameters));
    };

    readPortable(reader) {
        const me = this;

        //me.id = reader.readLong("id").toNumber();
        me.id = reader.readDouble("id");
        me.notification = reader.readUTF("notification");
        me.deviceId = reader.readUTF("deviceId");
        //me.networkId = reader.readLong("networkId").toNumber();
        me.networkId = reader.readDouble("networkId");
        //me.timestamp = new Date(reader.readLong("timestamp"));
        me.timestamp = new Date(reader.readDouble("timestamp"));
        me.parameters = JSON.parse(reader.readUTF("parameters"));
    };
}

module.exports = DeviceNotification;
