const Body = require(`../../../shim/Body`);
const Action = require(`../../../shim/Action`);


class ListPluginResponseBody extends Body {

    constructor({ plugins, ...rest } = {}) {
        super({ action: Action.LIST_PLUGIN_RESPONSE, plugins, ...rest });

        const me = this;

        me.plugins = plugins;
    }

    get plugins() {
        return this._plugins;
    }

    set plugins(value) {
        this._plugins = value;
    }
}


module.exports = ListPluginResponseBody;
