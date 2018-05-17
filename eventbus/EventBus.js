const Config = require(`../config`).backend;
const Utils = require(`../utils/Utils`);
const debug = require(`debug`)(`eventbus`);
const FilterRegistryFactory = require(`./FilterRegistry`);
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
        const FilterRegistry = FilterRegistryFactory(Config.CLUSTER_COMMUNICATOR_TYPE);
        const FilterRegistryServer = FilterRegistry.Server;
        const FilterRegistryClient = FilterRegistry.Client;

        if (Utils.isTrue(process.env.isMaster)) {
            FilterRegistryServer.start(Config.CLUSTER_COMMUNICATOR_PORT);

            debug(`Filter registry server started. Communicator type: ${Config.CLUSTER_COMMUNICATOR_TYPE}`);
        }

        me.filterRegistryClient = new FilterRegistryClient(Config.CLUSTER_COMMUNICATOR_PORT);

        debug(`Filter registry client started. Communicator type: ${Config.CLUSTER_COMMUNICATOR_TYPE}`);
    }

    /**
     * Registers new subscriber
     * @param filter
     * @param subscriber
     */
    subscribe(filter, subscriber) {
        const me = this;

        me.filterRegistryClient.register(filter, subscriber);

        debug(`Subscription request. Filter: ${JSON.stringify(filter)}, subscriber: ${JSON.stringify(subscriber)}`);
    }

    /**
     * Unregisters subscriber
     * @param subscriber
     */
    unsubscribe(subscriber) {
        const me = this;

        me.filterRegistryClient.unregister(subscriber);

        debug(`Unsubscription request. Subscriber: ${JSON.stringify(subscriber)}`);
    }

    /**
     * Publishes message to applicable subscribers
     * @param event
     */
    publish(event) {
        const me = this;

        Promise.all(event.getApplicableFilters().map(filter => me.filterRegistryClient.getSubscribers(filter)))
            .then((r) => {
                r.forEach(subscribers => subscribers.forEach((subscriber) => {
                    const response = new Response({
                        correlationId: subscriber.correlationId,
                        last: false,
                        failed: false
                    });

                    response.withBody(event);

                    ProxyMessageDispatcher.send(subscriber.replyTo, response);

                    debug(`Publish request. Subscriber ${JSON.stringify(subscriber)}, message: ${JSON.stringify(response)}`);
                }));
            })
            .catch((error) => {
                debug(`Error while publishing event: ${error}`);
            });
    }

    /**
     * Unregister device subscription
     * @param device
     */
    unsubscribeDevice(device) {
        const me = this;

        me.filterRegistryClient.unregisterDevice(device);

        debug(`Device unsubscription request. Device: ${JSON.stringify(device)}`);
    }
}


module.exports = new EventBus();
