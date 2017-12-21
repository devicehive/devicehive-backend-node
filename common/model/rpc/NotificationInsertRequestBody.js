const Body = require(`../../../shim/Body`);
const DeviceNotification = require(`../DeviceNotification`);


class NotificationInsertRequestBody extends Body {

    constructor({ deviceNotification, ...rest } = {}) {
        super({ deviceNotification, ...rest });

        const me = this;

        me.deviceNotification = deviceNotification;
    }

    get deviceNotification() {
        const me = this;

        return me._deviceNotification;
    }

    set deviceNotification(value) {
        const me = this;

        me._deviceNotification = new DeviceNotification(value);
    }
}


module.exports = NotificationInsertRequestBody;
