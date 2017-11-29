class DeviceNotification {

    constructor({ id, notification, deviceId, networkId, timestamp, parameters }) {
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

    getHazelcastKey() {
        const me = this;

        return `${me.id}-${me.deviceId}-${me.timestamp}`;
    }
}

module.exports = DeviceNotification;
