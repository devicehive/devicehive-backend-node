const Body = require(`../../../shim/Body`);
const Filter = require(`../eventbus/Filter`);


class NotificationSubscribeRequestBody extends Body {

    constructor({ subscriptionId, filter, names, timestamp, ...rest } = {}) {
        super({ subscriptionId, filter, names, timestamp, ...rest });

        const me = this;

        me.subscriptionId = subscriptionId;
        me.filter = filter;
        me.names = names;
        me.timestamp = timestamp;
    }

    get subscriptionId() {
        const me = this;

        return me._subscriptionId;
    }

    set subscriptionId(value) {
        const me = this;

        me._subscriptionId = value;
    }

    get filter() {
        const me = this;

        return me._filter;
    }

    set filter(value) {
        const me = this;

        me._filter = value ? new Filter(value) : value;
    }

    get names() {
        return this._names;
    }

    set names(value) {
        this._names = value;
    }

    get timestamp() {
        const me = this;

        return me._timestamp;
    }

    set timestamp(value) {
        const me = this;

        me._timestamp = value;
    }
}


module.exports = NotificationSubscribeRequestBody;
