const Body = require(`../../../shim/Body`);
const Action = require(`../../../shim/Action`);

// TODO
class CommandUpdateResponseBody extends Body {

    constructor({ ...rest } = {}) {
        super({ action: undefined, ...rest });
    }
}


module.exports = CommandUpdateResponseBody;
