
class HealthPayload {
    constructor({ status }) {
        const me = this;

        me.status = status;
    }

    get status() {
        const me = this;

        return me._status;
    }

    set status(value) {
        const me = this;

        me._status = value;
    }

    toString() {
        const me = this;

        return JSON.stringify({
            status: me.status
        })
    }
}

module.exports = HealthPayload;