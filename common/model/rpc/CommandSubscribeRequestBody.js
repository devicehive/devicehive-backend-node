const Body = require(`../../../shim/Body`);
const Filter = require(`../eventbus/Filter`);


class CommandSubscribeRequest extends Body {

    constructor({ subscriptionId, filter, names, timestamp, returnUpdated, limit, ...rest } = {}) {
        super({ subscriptionId, filter, names, timestamp, returnUpdated, limit, ...rest });

        const me = this;

        me.subscriptionId = subscriptionId;
        me.filter = filter;
        me.names = names;
        me.timestamp = timestamp;
        me.returnUpdated = returnUpdated;
        me.limit = limit;
    }

    get subscriptionId() {
        const me = this;

        return me._subscriptionId;
    }

    set subscriptionId(value) {
        const me = this;

        me._subscriptionId = value;
    }

    get device() {
        const me = this;

        return me._device;
    }

    set device(value) {
        const me = this;

        me._device = value;
    }

    get filter() {
        const me = this;

        return me._filter;
    }

    set filter(value) {
        const me = this;

        me._filter = value ? new Filter(value) : value;
    }

    get timestamp() {
        const me = this;

        return me._timestamp;
    }

    set timestamp(value) {
        const me = this;

        me._timestamp = value;
    }

    get names() {
        return this._names;
    }

    set names(value) {
        this._names = value;
    }

    get returnUpdated() {
        return this._returnUpdated;
    }

    set returnUpdated(value) {
        this._returnUpdated = value;
    }

    get limit() {
        return this._limit;
    }

    set limit(value) {
        this._limit = value;
    }
}


module.exports = CommandSubscribeRequest;
