const Body = require(`../../../shim/Body`);


class CommandUnsubscribeRequestBody extends Body {

    constructor({ subscriptionId, ...rest } = {}) {
        super({ subscriptionId, ...rest });

        const me = this;

        me.subscriptionId = subscriptionId;
    }

    get subscriptionId() {
        const me = this;

        return me._subscriptionId;
    }

    set subscriptionId(value) {
        const me = this;

        me._subscriptionId = value;
    }
}


module.exports = CommandUnsubscribeRequestBody;
