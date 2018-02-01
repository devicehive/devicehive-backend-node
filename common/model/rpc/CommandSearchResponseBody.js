const Body = require(`../../../shim/Body`);
const Action = require(`../../../shim/Action`);
const DeviceCommand = require(`../DeviceCommand`);


class CommandSearchResponseBody extends Body {

    constructor({ commands, ...rest } = {}) {
        super({ action: Action.COMMAND_SEARCH_RESPONSE, commands, ...rest });

        const me = this;

        me.commands = commands;
    }

    get commands() {
        const me = this;

        return me._commands;
    }

    set commands(value) {
        const me = this;

        me._commands = value ?
            value.map((command) => command ?
                new DeviceCommand(command) : command) : value;
    }
}


module.exports = CommandSearchResponseBody;
