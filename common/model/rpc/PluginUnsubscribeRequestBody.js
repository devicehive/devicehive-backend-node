const Body = require(`../../../shim/Body`);


class PluginUnsubscribeRequestBody extends Body {

    constructor({ subscriptionId, topicName, ...rest } = {}) {
        super({ subscriptionId, topicName, ...rest });

        const me = this;

        me.subscriptionId = subscriptionId;
        me.topicName = topicName;
    }

    get subscriptionId() {
        return this._subscriptionId;
    }

    set subscriptionId(value) {
        this._subscriptionId = value;
    }

    get topicName() {
        return this._topicName;
    }

    set topicName(value) {
        this._topicName = value;
    }
}


module.exports = PluginUnsubscribeRequestBody;
