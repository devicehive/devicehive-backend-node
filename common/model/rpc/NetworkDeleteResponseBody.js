const Body = require(`../../../shim/Body`);
const Action = require(`../../../shim/Action`);


class NetworkDeleteResponseBody extends Body {

    constructor({ ...rest } = {}) {
        super({ action: Action.NETWORK_DELETE_RESPONSE, ...rest });
    }
}


module.exports = NetworkDeleteResponseBody;
