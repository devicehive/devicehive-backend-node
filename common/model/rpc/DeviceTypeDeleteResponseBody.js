const Body = require(`../../../shim/Body`);
const Action = require(`../../../shim/Action`);


class DeviceTypeDeleteResponseBody extends Body {

    constructor({ ...rest } = {}) {
        super({ action: Action.DEVICE_TYPE_DELETE_RESPONSE, ...rest });
    }
}


module.exports = DeviceTypeDeleteResponseBody;
