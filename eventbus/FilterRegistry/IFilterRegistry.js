const EventEmitter = require(`events`);


/**
 * Filter Registry Interface
 */
class IFilterRegistry extends EventEmitter {

    /**
     * Registers new subscriber
     * @param filter
     * @param subscriber
     */
    register(filter, subscriber) {
        throw `Method "register(filter, subscriber)" should be implemented`;
    }

    /**
     * Unregisters subscriber
     * @param subscriber
     */
    unregister(subscriber) {
        throw `Method "unregister(subscriber)" should be implemented`;
    }

    /**
     * Returns subscribers by filter
     * @param filter
     * @returns {Array<Subscriber>}
     */
    getSubscribers(filter) {
        throw `Method "getSubscribers(filter)" should be implemented`;
    }

    /**
     * Unregisters device subscription
     * @param device
     */
    unregisterDevice(device) {
        throw `Method "unregisterDevice(device)" should be implemented`;
    }

}


module.exports = IFilterRegistry;
