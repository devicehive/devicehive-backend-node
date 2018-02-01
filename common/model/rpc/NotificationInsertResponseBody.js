const Body = require(`../../../shim/Body`);
const Action = require(`../../../shim/Action`);
const DeviceNotification = require(`../DeviceNotification`);

class NotificationInsertResponseBody extends Body {

    constructor({ deviceNotification, ...rest } = {}) {
        super({ action: Action.NOTIFICATION_INSERT_RESPONSE, deviceNotification, ...rest });

        const me = this;

        me.deviceNotification = deviceNotification;
    }

    get deviceNotification() {
        const me = this;

        return me._deviceNotification;
    }

    set deviceNotification(value) {
        const me = this;

        me._deviceNotification = value ? new DeviceNotification(value) : value;
    }
}


module.exports = NotificationInsertResponseBody;
