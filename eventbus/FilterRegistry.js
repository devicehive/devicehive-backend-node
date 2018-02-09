const ComplexMapFilterRegistry = require(`./ComplexMapFilterRegistry`);


/**
 * FilterRegistry class
 */
class FilterRegistry {

    /**
     * Creates new FilterRegistry object
     */
    constructor() {
        const me = this;

        me.registry = new ComplexMapFilterRegistry();
    }

    /**
     * Registers new subscriber
     * @param subscription
     * @param subscriber
     */
    register(subscription, subscriber) {
        const me = this;

        me.registry.register(subscription, subscriber);
    }

    /**
     * Unregisters subscriber
     * @param subscriber
     */
    unregister(subscriber) {
        const me = this;

        me.registry.unregister(subscriber);
    }

    /**
     * Returns subscribers by filter
     * @param filter
     * @returns {*}
     */
    getSubscribers(filter) {
        const me = this;

        return me.registry.getSubscribers(filter);
    }

    /**
     * Unregisters device subscription
     * @param device
     */
    unregisterDevice(device) {
        const me = this;

        me.registry.unregisterDevice(device);
    }
}


module.exports = FilterRegistry;
