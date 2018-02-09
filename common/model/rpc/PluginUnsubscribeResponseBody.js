const Body = require(`../../../shim/Body`);
const Action = require(`../../../shim/Action`);


class PluginUnsubscribeResponseBody extends Body {

    constructor({ subId, ...rest } = {}) {
        super({ action: Action.PLUGIN_UNSUBSCRIBE_RESPONSE, subId, ...rest });

        const me = this;

        me.subId = subId;
    }

    get subId() {
        const me = this;

        return me._subId;
    }

    set subId(value) {
        const me = this;

        me._subId = value;
    }
}


module.exports = PluginUnsubscribeResponseBody;
