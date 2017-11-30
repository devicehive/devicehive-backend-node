const Body = require(`../../../shim/Body.js`);
const DeviceNotification = require(`../DeviceNotification.js`);


class NotificationSubscribeRequestBody extends Body {

    constructor({ deviceNotification, ...rest }) {
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


module.exports = NotificationSubscribeRequestBody;
