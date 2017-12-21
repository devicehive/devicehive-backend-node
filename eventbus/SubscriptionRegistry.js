const ComplexMapRegistry = require(`./ComplexMapRegistry`);
const TopicPatternsRegistry = require(`./TopicPatternsRegistry`);


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

    getSubscribers(subscription) {
        const me = this;

        return me.proxy.getSubscribers(subscription);
    }
}


module.exports = SubscriptionRegistry;
