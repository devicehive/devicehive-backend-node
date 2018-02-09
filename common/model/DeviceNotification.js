const HazelcastPortable = require(`./HazelcastPortable`);
const Long = require(`long`);


class DeviceNotification extends HazelcastPortable {

    static get FACTORY_ID() { return 1; }
    static get CLASS_ID() { return 1; }

    static getClassName() { return DeviceNotification.name };

    constructor({ id, notification, deviceId, networkId, deviceTypeId, timestamp, parameters } = {}) {
        super();

        const me = this;

        me.id = id;
        me.notification = notification;
        me.deviceId = deviceId;
        me.networkId = networkId;
        me.deviceTypeId = deviceTypeId;
        me.timestamp = new Date(timestamp).getTime();
        me.parameters = parameters;
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

        return `${me.id}-${me.deviceId}`;
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
        writer.writeLong("deviceTypeId", Long.fromNumber(me.deviceTypeId, false));
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
