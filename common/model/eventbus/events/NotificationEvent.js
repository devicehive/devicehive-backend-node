const Event = require(`./Event`);
const DeviceNotification = require(`../../DeviceNotification`);
const Action = require(`../../../../shim/Action`);
const Filter = require(`../Filter`);


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

    getApplicableFilters() {
        const me = this;

        return [
            new Filter({
                networkId: me.notification.networkId,
                deviceTypeId: me.notification.deviceTypeId,
                deviceId: me.notification.deviceId,
                eventName: `notification`,
            }),
            new Filter({
                networkId: me.notification.networkId,
                deviceTypeId:  me.notification.deviceTypeId,
                deviceId: me.notification.deviceId,
                eventName: `notification`,
                name: me.notification.notification
            })
        ];
    }
}


module.exports = NotificationEvent;
