const Body = require(`../../../shim/Body`);
const Action = require(`../../../shim/Action`);


class DeviceDeleteResponseBody extends Body {

    constructor({ ...rest } = {}) {
        super({ action: Action.DEVICE_DELETE_RESPONSE, ...rest });
    }
}


module.exports = DeviceDeleteResponseBody;
