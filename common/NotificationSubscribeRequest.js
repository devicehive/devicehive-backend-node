const Filter = require(`./Filter.js`);


class NotificationSubscribeRequest {

    constructor({ subscriptionId, device, filter, timestamp }) {
        const me = this;

        me.subscriptionId = subscriptionId;
        me.device = device;
        me.filter = filter;
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

        me._filter = new Filter(value);
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


module.exports= NotificationSubscribeRequest;
