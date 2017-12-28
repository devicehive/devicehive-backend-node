const HazelcastPortable = require(`./HazelcastPortable`);
const Long = require(`long`);


class HivePrincipal extends HazelcastPortable {

    static get FACTORY_ID() { return 1; }
    static get CLASS_ID() { return 3; }

    static getClassName() { return HivePrincipal.name };

    constructor({ actions, networkIds, deviceTypeIds, allNetworksAvailable, allDevicesAvailable, user } = {}) {
        super();

        const me = this;

        me.actions = actions;
        me.networkIds = networkIds;
        me.deviceTypeIds = deviceTypeIds;
        me.allNetworksAvailable = allNetworksAvailable;
        me.allDeviceTypesAvailable = allDevicesAvailable;
        me.user = user;
    }

    get actions() {
        const me = this;

        return me._actions;
    }

    set actions(value) {
        const me = this;

        me._actions = value;
    }

    get networkIds() {
        const me = this;

        return me._networkIds;
    }

    set networkIds(value) {
        const me = this;

        me._networkIds = value;
    }

    get deviceTypeIds() {
        const me = this;

        return me._deviceTypeIds;
    }

    set deviceTypeIds(value) {
        const me = this;

        me._deviceTypeIds = value;
    }

    get allNetworksAvailable() {
        const me = this;

        return me._allNetworksAvailable;
    }

    set allNetworksAvailable(value) {
        const me = this;

        me._allNetworksAvailable = value;
    }

    get allDeviceTypesAvailable() {
        const me = this;

        return me._allDeviceTypesAvailable;
    }

    set allDeviceTypesAvailable(value) {
        const me = this;

        me._allDeviceTypesAvailable = value;
    }

    get user() {
        const me = this;

        return me._user;
    }

    set user(value) {
        const me = this;

        me._user = value;
    }

    getFactoryId() {
        return HivePrincipal.FACTORY_ID;
    };

    getClassId() {
        return HivePrincipal.CLASS_ID;
    };

    writePortable(writer) {
        const me = this;

        writer.writeBoolean("allNetworksAvailable", me.allNetworksAvailable);
        writer.writeBoolean("allDeviceTypesAvailable", me.allDeviceTypesAvailable);
        writer.writeLongArray("networkIds", me.networkIds ? me.networkIds.map((networkId) => Long.fromNumber(networkId), false) : []);
        writer.writeLongArray("deviceTypeIds", me.deviceTypeIds ? me.deviceTypeIds.map((deviceTypeId) => Long.fromNumber(deviceTypeId, false)) : []);

    };

    readPortable(reader) {
        const me = this;

        me.allNetworksAvailable = reader.readBoolean("allNetworksAvailable");
        me.allNetworksAvailable = reader.readBoolean("allDeviceTypesAvailable");
        me.networkIds = reader.readLongArray("networkIds").map((networkId) => networkId.toNumber());
        me.deviceTypeIds = reader.readLongArray("deviceTypeIds").map((deviceTypeId) => deviceTypeId.toNumber());
    };
}

module.exports = HivePrincipal;
