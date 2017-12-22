const ComplexMapFilterRegistry = require(`./ComplexMapFilterRegistry`);
const TopicPatternsRegistry = require(`./TopicPatternsRegistry`);


class FilterRegistry {

    constructor() {
        const me = this;

        me.registry = new ComplexMapFilterRegistry();
    }

    register(subscription, subscriber) {
        const me = this;

        me.registry.register(subscription, subscriber);
    }

    unregister(subscriber) {
        const me = this;

        me.registry.unregister(subscriber);
    }

    getSubscribers(filter) {
        const me = this;

        return me.registry.getSubscribers(filter);
    }

    unregisterDevice(device) {
        const me = this;

        me.registry.unregisterDevice(device);
    }
}


module.exports = FilterRegistry;
