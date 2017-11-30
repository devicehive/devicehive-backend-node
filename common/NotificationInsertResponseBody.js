const Body = require(`../shim/Body.js`);
const Action = require(`../shim/Action.js`);
const DeviceNotification = require(`./DeviceNotification.js`);

class NotificationInsertResponseBody extends Body {

    constructor({ deviceNotification, ...rest }) {
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

        me._deviceNotification = new DeviceNotification(value);
    }
}


module.exports = NotificationInsertResponseBody;
