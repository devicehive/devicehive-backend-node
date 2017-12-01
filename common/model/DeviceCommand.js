const Long = require(`long`);


class DeviceCommand {

    static get FACTORY_ID() { return 1; }
    static get CLASS_ID() { return 2; }

    static getClassName() { return DeviceCommand.name };

    constructor({ id, command, timestamp, lastUpdated, userId, deviceId, networkId, parameters, lifetime, status, result, isUpdated } = {}) {
        const me = this;

        me.id = id;
        me.command = command;
        me.timestamp = timestamp;
        me.lastUpdated = lastUpdated;
        me.userId = userId;
        me.deviceId = deviceId;
        me.networkId = networkId;
        me.parameters = parameters;
        me.lifetime = lifetime;
        me.status = status;
        me.result = result;
        me.isUpdated = isUpdated;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get command() {
        return this._command;
    }

    set command(value) {
        this._command = value;
    }

    get timestamp() {
        return this._timestamp;
    }

    set timestamp(value) {
        this._timestamp = value;
    }

    get lastUpdated() {
        return this._lastUpdated;
    }

    set lastUpdated(value) {
        this._lastUpdated = value;
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get deviceId() {
        return this._deviceId;
    }

    set deviceId(value) {
        this._deviceId = value;
    }

    get networkId() {
        return this._networkId;
    }

    set networkId(value) {
        this._networkId = value;
    }

    get parameters() {
        return this._parameters;
    }

    set parameters(value) {
        this._parameters = value;
    }

    get lifetime() {
        return this._lifetime;
    }

    set lifetime(value) {
        this._lifetime = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get result() {
        return this._result;
    }

    set result(value) {
        this._result = value;
    }

    get isUpdated() {
        return this._isUpdated;
    }

    set isUpdated(value) {
        this._isUpdated = value;
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

    };

    readPortable(reader) {
        const me = this;

    };
}

module.exports = DeviceCommand;
