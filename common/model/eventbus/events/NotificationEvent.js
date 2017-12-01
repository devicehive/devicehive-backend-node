const Event = require(`./Event.js`);
const DeviceNotification = require(`../../DeviceNotification.js`);
const Action = require(`../../../../shim/Action.js`);
const Subscription = require(`../Subscription.js`);


class NotificationEvent extends Event {

    constructor({ deviceNotification } = {}) {
        super({ action: Action.NOTIFICATION_EVENT, notification: deviceNotification });

        const me = this;

        me.notification = deviceNotification;
    }

    get notification() {
        return this._notification;
    }

    set notification(value) {
        this._notification = new DeviceNotification(value);
    }

    getApplicableSubscriptions() {
        const me = this;
        const deviceOnly = new Subscription({
            networkId: me.notification.networkId,
            deviceTypeId: 0,
            deviceId: me.notification.deviceId,
            eventType: `notification`,
        });
        const deviceWithName = new Subscription({
            networkId: me.notification.networkId,
            deviceTypeId: 0,
            deviceId: me.notification.deviceId,
            eventType: `notification`,
            name: me.notification.notification
        });

        return [ deviceOnly, deviceWithName ];
    }
}


module.exports = NotificationEvent;
