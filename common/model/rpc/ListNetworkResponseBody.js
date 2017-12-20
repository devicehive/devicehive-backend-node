const Body = require(`../../../shim/Body.js`);


class ListNetworkResponseBody extends Body {

    constructor({ networks, ...rest } = {}) {
        super({ networks, ...rest });

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
