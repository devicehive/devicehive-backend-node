const Body = require(`../../../shim/Body`);
const Action = require(`../../../shim/Action`);
const DeviceCommand = require(`../DeviceCommand`);


class CommandUpdateSubscribeResponseBody extends Body {

    constructor({ subscriptionId, deviceCommand, ...rest } = {}) {
        super({ action: Action.COMMAND_UPDATE_SUBSCRIBE_RESPONSE, subscriptionId, deviceCommand, ...rest });

        const me = this;

        me.subscriptionId = subscriptionId;
        me.deviceCommand = deviceCommand;
    }

    get subscriptionId() {
        const me = this;

        return me._subscriptionId;
    }

    set subscriptionId(value) {
        const me = this;

        me._subscriptionId = value;
    }

    get deviceCommand() {
        return this._deviceCommand;
    }

    set deviceCommand(value) {
        this._deviceCommand = new DeviceCommand(value);
    }

}


module.exports = CommandUpdateSubscribeResponseBody;
