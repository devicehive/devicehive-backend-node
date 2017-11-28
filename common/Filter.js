const HivePrincipal = require(`./HivePrincipal.js`);


class Filter {

    constructor({ principal, global = false, networkIds, deviceIds, eventName, names } = {}) {
        const me = this;

        me.principal = principal;
        me.global = global;
        me.networkIds = networkIds;
        me.deviceIds = deviceIds;
        me.eventName = eventName;
        me.names = names;
    }

    get principal() {
        const me = this;

        return me._principal;
    }

    set principal(value) {
        const me = this;

        me._principal = new HivePrincipal(value);
    }

    get global() {
        const me = this;

        return me._global;
    }

    set global(value) {
        const me = this;

        me._global = value;
    }

    get networkIds() {
        const me = this;

        return me._networkIds;
    }

    set networkIds(value) {
        const me = this;

        me._networkIds = value;
    }

    get deviceIds() {
        const me = this;

        return me._deviceIds;
    }

    set deviceIds(value) {
        const me = this;

        me._deviceIds = value;
    }

    get eventName() {
        const me = this;

        return me._eventName;
    }

    set eventName(value) {
        const me = this;

        me._eventName = value;
    }

    get names() {
        const me = this;

        return me._names;
    }

    set names(value) {
        const me = this;

        me._names = value;
    }
}


module.exports = Filter;
