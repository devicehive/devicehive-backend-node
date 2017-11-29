const Body = require(`../shim/Body.js`);


class NotificationUnsubscribeRequestBody extends Body {

    constructor({ subscriptionIds, ...rest }) {
        super({ subscriptionIds, ...rest });

        const me = this;

        me.subscriptionIds = subscriptionIds;
    }

    get subscriptionIds() {
        const me = this;

        return me._subscriptionIds;
    }

    set subscriptionIds(value) {
        const me = this;

        me._subscriptionIds = value;
    }
}


module.exports = NotificationUnsubscribeRequestBody;
