const ComplexMapRegistry = require(`./ComplexMapRegistry.js`);
const TopicPatternsRegistry = require(`./TopicPatternsRegistry.js`);


class SubscriptionRegistry {

    constructor() {
        const me = this;

        me.proxy = new ComplexMapRegistry();
    }

    register(subscription, subscriber) {
        const me = this;

        me.proxy.register(subscription, subscriber);
    }

    unregister(subscriber) {
        const me = this;

        me.proxy.unregister(subscriber);
    }

    getSubscribers(networkId, deviceTypeId, deviceId, eventType, name) {
        const me = this;

        me.proxy.getSubscribers(networkId, deviceTypeId, deviceId, eventType, name);
    }
}


module.exports = SubscriptionRegistry;
