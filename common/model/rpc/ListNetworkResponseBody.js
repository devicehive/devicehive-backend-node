const Body = require(`../../../shim/Body`);
const Action = require(`../../../shim/Action`);


class ListNetworkResponseBody extends Body {

    constructor({ networks, ...rest } = {}) {
        super({ action: Action.LIST_NETWORK_RESPONSE, networks, ...rest });

        const me = this;

        me.networks = networks;
    }

    get networks() {
        return this._networks;
    }

    set networks(value) {
        this._networks = value;
    }
}


module.exports = ListNetworkResponseBody;
