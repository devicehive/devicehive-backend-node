const Body = require(`../../../shim/Body`);
const Action = require(`../../../shim/Action`);


class CommandSubscribeResponse extends Body {

    constructor({ subId, commands, ...rest } = {}) {
        super({ action: Action.COMMAND_SUBSCRIBE_RESPONSE, subId, commands, ...rest });

        const me = this;

        me.subId = subId;
        me.commands = commands;
    }

    get subId() {
        const me = this;

        return me._subId;
    }

    set subId(value) {
        const me = this;

        me._subId = value;
    }

    get commands() {
        const me = this;

        return me._commands;
    }

    set commands(value) {
        const me = this;

        me._commands = value;
    }
}


module.exports = CommandSubscribeResponse;
