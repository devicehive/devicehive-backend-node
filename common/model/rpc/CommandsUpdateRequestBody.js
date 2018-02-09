const Body = require(`../../../shim/Body`);
const DeviceCommand = require(`../DeviceCommand`);


class CommandsUpdateRequestBody extends Body {

    constructor({ deviceCommand, ...rest } = {}) {
        super({ deviceCommand, ...rest });

        const me = this;

        me.deviceCommand = deviceCommand;
    }

    get deviceCommand() {
        const me = this;

        return me._deviceCommand;
    }

    set deviceCommand(value) {
        const me = this;

        me._deviceCommand = value ? new DeviceCommand(value) : value;
    }
}


module.exports = CommandsUpdateRequestBody;
