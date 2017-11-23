const uuid = require('uuid/v1');

class ProxyMessage {

    constructor({ id = uuid(), type, action, status, payload }) {
        const me = this;

        me._id = id;
        me._type = type;
        me._action = action;
        me._value = status;
        me._payload = payload;
    }

    get id() {
        const me = this;

        return me._id;
    }

    set id(value) {
        const me = this;

        me._id = value;
    }

    get type() {
        const me = this;

        return me._type;
    }

    set type(value) {
        const me = this;

        me._type = value;
    }

    get action() {
        const me = this;

        return me._action;
    }

    set action(value) {
        const me = this;

        me._action = value;
    }

    get status() {
        const me = this;

        return me._value;
    }

    set status(value) {
        const me = this;

        me._value = value;
    }

    get payload() {
        const me = this;

        return me._payload;
    }

    set payload(value) {
        const me = this;

        me._payload = value;
    }

    toString() {
        const me = this;

        return JSON.stringify({
            id: me.id,
            t: me.type,
            a: me.action,
            s: me.status,
            p: me.payload
        });
    }

    static normalize(data) {
        return new ProxyMessage({
            id: data.id,
            type: data.t,
            action: data.a,
            status: data.s,
            payload: data.p
        })
    }

}

module.exports = ProxyMessage;
