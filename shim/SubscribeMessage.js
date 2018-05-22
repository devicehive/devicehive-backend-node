const Request = require(`./Request`);


/**
 *
 */
class SubscribeMessage extends Request {

    static get REGISTER_ACTION() { return 0; }
    static get UNREGISTER_ACTION() { return 1; }
    static get UNREGISTER_DEVICE_ACTION() { return 2; }

    /**
     *
     * @param action
     * @param filter
     * @param subscriber
     * @param device
     */
    constructor({ action, filter, subscriber, device } = {}) {
        super({ type: Request.FILTER_REGISTRY_REQUEST_TYPE });

        const me = this;

        me.action = action;
        me.filter = filter;
        me.subscriber = subscriber;
        me.device = device;
    }

    get action() {
        return this._action;
    }

    set action(value) {
        this._action = value;
    }

    get filter() {
        return this._filter;
    }

    set filter(value) {
        this._filter = value;
    }

    get subscriber() {
        return this._subscriber;
    }

    set subscriber(value) {
        this._subscriber = value;
    }

    get device() {
        return this._device;
    }

    set device(value) {
        this._device = value;
    }

    /**
     *
     * @returns {{a: *, f: *, s: *, t: *}}
     */
    toObject() {
        const me = this;

        return {
            a: me.action,
            f: me.filter,
            s: me.subscriber,
            d: me.device,
            t: me.type
        };
    }

    /**
     *
     * @returns {string}
     */
    toString() {
        const me = this;

        return JSON.stringify(me.toObject());
    }
}


module.exports = SubscribeMessage;
