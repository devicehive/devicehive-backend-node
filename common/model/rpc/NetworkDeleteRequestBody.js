const Body = require(`../../../shim/Body`);


class NetworkDeleteRequestBody extends Body {

    constructor({ networkId, devices, ...rest } = {}) {
        super({ networkId, devices, ...rest });

        this.networkId = networkId;
        this.devices = devices;

    }

    get networkId() {
        return this._networkId;
    }

    set networkId(value) {
        this._networkId = value;
    }

    get devices() {
        return this._devices;
    }

    set devices(value) {
        this._devices = value;
    }
}


module.exports = NetworkDeleteRequestBody;
