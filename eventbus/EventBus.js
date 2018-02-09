const debug = require(`debug`)(`eventbus`);
const FilterRegistry = require(`./FilterRegistry`);
const ProxyMessageDispatcher = require(`./ProxyMessageDispatcher`);
const Response = require(`../shim/Response`);


/**
 * EventBus class
 */
class EventBus {

    /**
     * Creates new EventBus object
     */
    constructor() {
        const me = this;

        me.filterRegistry = new FilterRegistry();
    }

    /**
     * Registers new subscriber
     * @param filter
     * @param subscriber
     */
    subscribe(filter, subscriber) {
        const me = this;

        me.filterRegistry.register(filter, subscriber);

        debug(`Subscription request. Filter: ${JSON.stringify(filter)}, subscriber: ${JSON.stringify(subscriber)}`);
    }

    /**
     * Unregisters subscriber
     * @param subscriber
     */
    unsubscribe(subscriber) {
        const me = this;

        me.filterRegistry.unregister(subscriber);

        debug(`Unsubscription request. Subscriber: ${JSON.stringify(subscriber)}`);
    }

    /**
     * Publishes message to applicable subscribers
     * @param event
     */
    publish(event) {
        const me = this;

        event.getApplicableFilters()
            .map(filter => me.filterRegistry.getSubscribers(filter))
            .forEach(subscribers => subscribers.forEach((subscriber) => {
                const response = new Response({
                    correlationId: subscriber.correlationId,
                    last: false,
                    failed: false
                });

                response.withBody(event);

                ProxyMessageDispatcher.send(subscriber.replyTo, response);

                debug(`Publish request. Subscriber ${JSON.stringify(subscriber)}, message: ${JSON.stringify(response)}`);
            }));
    }

    /**
     * Unregister device subscription
     * @param device
     */
    unsubscribeDevice(device) {
        const me = this;

        me.filterRegistry.unregisterDevice(device);

        debug(`Device unsubscription request. Device: ${JSON.stringify(device)}`);
    }
}


module.exports = new EventBus();
