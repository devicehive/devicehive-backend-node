const Body = require(`../../../shim/Body.js`);


class ListDeviceTypeResponseBody extends Body {

    constructor({ deviceTypes, ...rest } = {}) {
        super({ name, ...rest });

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
