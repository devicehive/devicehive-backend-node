
class Subscription {

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

}

module.exports = Subscription;
