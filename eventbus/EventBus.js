const SubscriptionRegistry = require(`./SubscriptionRegistry.js`);

class EventBus {

    constructor() {
        const me = this;

        me.subscriptionRegistry = new SubscriptionRegistry();
    }

    subscribe(subscription, subscriber) {
        const me = this;

        me.subscriptionRegistry.register(subscription, subscriber);
    }

    unsubscribe( subscriber) {
        const me = this;

        me.subscriptionRegistry.unregister(subscriber);
    }

    publish(event) {

    }
}

module.exports = new EventBus();
