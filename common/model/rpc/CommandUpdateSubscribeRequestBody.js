const Body = require(`../../../shim/Body`);
const Filter = require(`../eventbus/Filter`);


class CommandUpdateSubscribeRequestBody extends Body {

    constructor({ commandId, deviceId, subscriptionId, filter, ...rest } = {}) {
        super({ commandId, deviceId, subscriptionId, filter, ...rest });

        const me = this;

        me.commandId = commandId;
        me.deviceId = deviceId;
        me.subscriptionId = subscriptionId;
        me.filter = filter;
    }

    get commandId() {
        return this._commandId;
    }

    set commandId(value) {
        this._commandId = value;
    }

    get deviceId() {
        return this._deviceId;
    }

    set deviceId(value) {
        this._deviceId = value;
    }

    get subscriptionId() {
        return this._subscriptionId;
    }

    set subscriptionId(value) {
        this._subscriptionId = value;
    }

    get filter() {
        return this._filter;
    }

    set filter(value) {
        this._filter = value ? new Filter(value) : value;
    }
}


module.exports = CommandUpdateSubscribeRequestBody;
