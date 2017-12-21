const Body = require(`../../../shim/Body`);
const Action = require(`../../../shim/Action`);
const DeviceCommand = require(`../DeviceCommand`);


class CommandInsertResponseBody extends Body {

    constructor({ deviceCommand, ...rest } = {}) {
        super({ action: Action.COMMAND_INSERT_RESPONSE, deviceCommand, ...rest });

        const me = this;

        me.deviceCommand = deviceCommand;
    }

    get deviceCommand() {
        const me = this;

        return me._deviceCommand;
    }

    set deviceCommand(value) {
        const me = this;

        me._deviceCommand = new DeviceCommand(value);
    }
}


module.exports = CommandInsertResponseBody;
