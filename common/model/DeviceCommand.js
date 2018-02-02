const HazelcastPortable = require(`./HazelcastPortable`);
const Long = require(`long`);


class DeviceCommand extends HazelcastPortable {

    static get FACTORY_ID() { return 1; }
    static get CLASS_ID() { return 2; }

    static getClassName() { return DeviceCommand.name };

    constructor({ id, command, timestamp, lastUpdated, userId, deviceId, networkId,
                    deviceTypeId, parameters, lifetime, status, result, isUpdated } = {}) {
        super();

        const me = this;

        me.id = id;
        me.command = command;
        me.timestamp = timestamp;
        me.lastUpdated = lastUpdated;
        me.userId = userId;
        me.deviceId = deviceId;
        me.networkId = networkId;
        me.deviceTypeId = deviceTypeId;
        me.parameters = parameters;
        me.lifetime = lifetime;
        me.status = status;
        me.result = result;
        me.isUpdated = isUpdated;
    }

    toObject() {
        const me = this;

        return {
            id: me.id,
            command: me.command,
            timestamp: me.timestamp,
            lastUpdated: me.lastUpdated,
            userId: me.userId,
            deviceId: me.deviceId,
            networkId: me.networkId,
            deviceTypeId: me.deviceTypeId,
            parameters: me.parameters,
            lifetime: me.lifetime,
            status: me.status,
            result: me.result,
            isUpdated: me.isUpdated
        }
    }

    getHazelcastKey() {
        const me = this;

        return `${me.id}-${me.deviceId}-${me.timestamp}`;
    }

    getFactoryId() {
        return DeviceCommand.FACTORY_ID;
    };

    getClassId() {
        return DeviceCommand.CLASS_ID;
    };

    writePortable(writer) {
        const me = this;

        writer.writeLong("id", Long.fromNumber(me.id , false));
        writer.writeUTF("command", me.command);
        writer.writeLong("timestamp", Long.fromNumber(new Date(me.timestamp).getTime(), false));
        writer.writeLong("lastUpdated", Long.fromNumber(new Date(me.lastUpdated).getTime(), false));
        writer.writeLong("userId", Long.fromNumber(me.userId , false));
        writer.writeUTF("deviceId", me.deviceId);
        writer.writeLong("networkId", Long.fromNumber(me.networkId , false));
        writer.writeLong("deviceTypeId", Long.fromNumber(me.deviceTypeId , false));
        writer.writeUTF("parameters", me.parameters ? JSON.stringify(me.parameters) : null);
        writer.writeInt("lifetime", me.lifetime);
        writer.writeUTF("status", me.status);
        writer.writeUTF("result", me.result ? JSON.stringify(me.result) : null);
        writer.writeBoolean("isUpdated", me.isUpdated);
    };

    readPortable(reader) {
        const me = this;

        me.id = reader.readLong("id").toNumber();
        me.command = reader.readUTF("command");
        me.timestamp = new Date(reader.readLong("timestamp").toNumber());
        me.lastUpdated = new Date(reader.readLong("lastUpdated").toNumber());
        me.userId = reader.readLong("userId").toNumber();
        me.deviceId = reader.readUTF("deviceId");
        me.networkId = reader.readLong("networkId").toNumber();
        me.deviceTypeId = reader.readLong("deviceTypeId").toNumber();
        me.parameters = JSON.parse(reader.readUTF("parameters"));
        me.lifetime = reader.readInt("lifetime");
        me.status = reader.readUTF("status");
        me.result = JSON.parse(reader.readUTF("result"));
        me.isUpdated = reader.readBoolean("isUpdated");
    };
}

module.exports = DeviceCommand;
