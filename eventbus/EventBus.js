const SubscriptionRegistry = require(`./SubscriptionRegistry.js`);

class EventBus {

    constructor() {
        const me = this;

        me.subscriptionRegistry = new SubscriptionRegistry();
    }

    subscribe(networkId, deviceTypeId, deviceId, eventType, name, subscriber) {
        const me = this;

        me.subscriptionRegistry.register(networkId, deviceTypeId, deviceId, eventType, name, subscriber);
    }
}

module.exports = new EventBus();
