const Long = require(`long`);


class DeviceNotification {

    static get FACTORY_ID() { return 1; }
    static get CLASS_ID() { return 1; }

    static getClassName() { return DeviceNotification.name };

    constructor({ id, notification, deviceId, networkId, deviceTypeId, timestamp, parameters } = {}) {
        const me = this;

        me.id = id;
        me.notification = notification;
        me.deviceId = deviceId;
        me.networkId = networkId;
        me.deviceTypeId = deviceTypeId;
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

    get deviceTypeId() {
        const me = this;

        return me._deviceTypeId;
    }

    set deviceTypeId(value) {
        this._deviceTypeId = value;
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
            deviceTypeId: me.deviceTypeId,
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

        writer.writeLong("id", Long.fromNumber(me.id, false));
        writer.writeUTF("notification", me.notification);
        writer.writeUTF("deviceId", me.deviceId);
        writer.writeLong("networkId", Long.fromNumber(me.networkId, false));
        writer.writeLong("deviceTypeId", Long.fromNumber(me.networkId, false));
        writer.writeLong("timestamp", Long.fromNumber(new Date(me.timestamp).getTime(), false));
        writer.writeUTF("parameters", me.parameters ? JSON.stringify(me.parameters) : null);
    };

    readPortable(reader) {
        const me = this;

        me.id = reader.readLong("id").toNumber();
        me.notification = reader.readUTF("notification");
        me.deviceId = reader.readUTF("deviceId");
        me.networkId = reader.readLong("networkId").toNumber();
        me.deviceTypeId = reader.readLong("deviceTypeId").toNumber();
        me.timestamp = new Date(reader.readLong("timestamp").toNumber());
        me.parameters = JSON.parse(reader.readUTF("parameters"));
    };
}

module.exports = DeviceNotification;
