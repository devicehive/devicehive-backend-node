const Body = require(`../../../shim/Body`);
const Action = require(`../../../shim/Action`);


class ListDeviceTypeResponseBody extends Body {

    constructor({ deviceTypes, ...rest } = {}) {
        super({ action: Action.LIST_DEVICE_TYPE_RESPONSE, deviceTypes, ...rest });

        const me = this;

        me.deviceTypes = deviceTypes;
    }

    get deviceTypes() {
        return this._deviceTypes;
    }

    set deviceTypes(value) {
        this._deviceTypes = value;
    }
}


module.exports = ListDeviceTypeResponseBody;
