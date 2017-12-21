const Body = require(`../../../shim/Body`);
const Action = require(`../../../shim/Action`);


class PluginSubscribeResponseBody extends Body {

    constructor({ subId, ...rest } = {}) {
        super({ action: Action.PLUGIN_SUBSCRIBE_RESPONSE, subId, ...rest });

        const me = this;

        me.subId = subId;
    }

    get subId() {
        const me = this;

        return me._subId;
    }

    set subId(value) {
        const me = this;

        me._subId = subId;
    }
}


module.exports = PluginSubscribeResponseBody;
