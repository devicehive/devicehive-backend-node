const Body = require(`../../../shim/Body`);


class DeviceDeleteRequestBody extends Body {

    constructor({ device, ...rest } = {}) {
        super({ device, ...rest });

        const me = this;

        me.device = device;

    }

    get device() {
        return this._device;
    }

    set device(value) {
        this._device = value;
    }
}


module.exports = DeviceDeleteRequestBody;
