const Body = require(`../../../shim/Body`);
const Action = require(`../../../shim/Action`);


class CommandUnsubscribeResponseBody extends Body {

    constructor({ subscriptionIds, ...rest } = {}) {
        super({ action: Action.COMMAND_UNSUBSCRIBE_RESPONSE, subscriptionIds, ...rest });

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


module.exports = CommandUnsubscribeResponseBody;
