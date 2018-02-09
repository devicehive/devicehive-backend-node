const Body = require(`../../../shim/Body`);
const Filter = require(`../eventbus/Filter`);


class PluginSubscribeRequestBody extends Body {

    constructor({ subscriptionId, filters, names, userId, topicName, returnCommands, returnUpdatedCommands, returnNotifications, ...rest } = {}) {
        super({ subscriptionId, filters, names, userId, topicName, returnCommands, returnUpdatedCommands, returnNotifications, ...rest });

        const me = this;

        me.subscriptionId = subscriptionId;
        me.filters = filters;
        me.names = names;
        me.userId = userId;
        me.topicName = topicName;
        me.returnCommands = returnCommands;
        me.returnUpdatedCommands = returnUpdatedCommands;
        me.returnNotifications = returnNotifications;
    }

    get subscriptionId() {
        return this._subscriptionId;
    }

    set subscriptionId(value) {
        this._subscriptionId = value;
    }

    get filters() {
        return this._filters;
    }

    set filters(value) {
        this._filters = value ? value.map((item) => new Filter(item)) : value;
    }

    get names() {
        return this._names;
    }

    set names(value) {
        this._names = value;
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get topicName() {
        return this._topicName;
    }

    set topicName(value) {
        this._topicName = value;
    }

    get returnCommands() {
        return this._returnCommands;
    }

    set returnCommands(value) {
        this._returnCommands = value;
    }

    get returnUpdatedCommands() {
        return this._returnUpdatedCommands;
    }

    set returnUpdatedCommands(value) {
        this._returnUpdatedCommands = value;
    }

    get returnNotifications() {
        return this._returnNotifications;
    }

    set returnNotifications(value) {
        this._returnNotifications = value;
    }
}


module.exports = PluginSubscribeRequestBody;
