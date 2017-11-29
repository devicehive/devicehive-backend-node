const Body = require(`../shim/Body.js`);
const Action = require(`../shim/Action.js`);

class NotificationSubscribeResponseBody extends Body {

    constructor({ subId, notifications, ...rest }) {
        super({ action: Action.NOTIFICATION_SUBSCRIBE_RESPONSE, subId, notifications, ...rest });

        const me = this;

        me.subId = subId;
        me.notifications = notifications;
    }

    get subId() {
        const me = this;

        return me._subId;
    }

    set subId(value) {
        const me = this;

        me._subId = value;
    }

    get notifications() {
        const me = this;

        return me._notifications;
    }

    set notifications(value) {
        const me = this;

        me._notifications = value;
    }
}


module.exports = NotificationSubscribeResponseBody;
