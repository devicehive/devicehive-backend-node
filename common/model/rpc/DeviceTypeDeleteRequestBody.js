const Body = require(`../../../shim/Body`);


class DeviceTypeDeleteRequestBody extends Body {

    constructor({ deviceTypeId, devices, ...rest } = {}) {
        super({ deviceTypeId, devices, ...rest });

        this.deviceTypeId = deviceTypeId;
        this.devices = devices;

    }

    get deviceTypeId() {
        return this._deviceTypeId;
    }

    set deviceTypeId(value) {
        this._deviceTypeId = value;
    }

    get devices() {
        return this._devices;
    }

    set devices(value) {
        this._devices = value;
    }
}


module.exports = DeviceTypeDeleteRequestBody;
