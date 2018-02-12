const Constants = require(`../../../Constants`);
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
        this._notification = value ? new DeviceNotification(value) : value;
    }

    getApplicableFilters() {
        const me = this;

        return [
            new Filter({
                networkId: me.notification.networkId,
                deviceTypeId: me.notification.deviceTypeId,
                deviceId: me.notification.deviceId,
                eventName: Constants.NOTIFICATION_EVENT
            }),
            new Filter({
                networkId: me.notification.networkId,
                deviceTypeId:  me.notification.deviceTypeId,
                deviceId: me.notification.deviceId,
                eventName: Constants.NOTIFICATION_EVENT,
                name: me.notification.notification
            })
        ];
    }
}


module.exports = NotificationEvent;
