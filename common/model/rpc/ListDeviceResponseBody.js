const Body = require(`../../../shim/Body`);
const Action = require(`../../../shim/Action`);

class ListDeviceResponseBody extends Body {

    constructor({ devices, ...rest } = {}) {
        super({ action: Action.LIST_DEVICE_RESPONSE, devices, ...rest });

        const me = this;

        me.devices = devices;
    }

    get devices() {
        return this._devices;
    }

    set devices(value) {
        this._devices = value;
    }
}


module.exports = ListDeviceResponseBody;
