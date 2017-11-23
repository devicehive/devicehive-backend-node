
class NotificationPayload {
    constructor({ value }) {
        const me = this;

        me.value = value;
    }

    get value() {
        const me = this;

        return me._value;
    }

    set value(value) {
        const me = this;

        me._value = value;
    }

    toString() {
        const me = this;

        return JSON.stringify({
            value: me.value
        })
    }
}

module.exports = NotificationPayload;