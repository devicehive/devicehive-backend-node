const Body = require(`../../../shim/Body`);
const Action = require(`../../../shim/Action`);

class ListDeviceResponseBody extends Body {

    constructor({ message, ...rest } = {}) {
        super({ action: Action.ERROR_RESPONSE, message, ...rest });

        const me = this;

        me.message = message;
    }

    get message() {
        return this._message;
    }

    set message(value) {
        this._message = value;
    }
}


module.exports = ListDeviceResponseBody;
