const FilterRegistry = require(`./FilterRegistry`);
const ProxyMessageDispatcher = require(`./ProxyMessageDispatcher`);
const Response = require(`../shim/Response`);


class EventBus {

    constructor() {
        const me = this;

        me.filterRegistry = new FilterRegistry();
        me.messageDispatcher = new ProxyMessageDispatcher();
    }

    subscribe(filter, subscriber) {
        const me = this;

        me.filterRegistry.register(filter, subscriber);
    }

    unsubscribe(subscriber) {
        const me = this;

        me.filterRegistry.unregister(subscriber);
    }

    publish(event) {
        const me = this;

        event.getApplicableFilters()
            .map((filter) => {
                return me.filterRegistry.getSubscribers(filter)
            })
            .forEach((subscribers) => subscribers.forEach((subscriber) => {
                const response = new Response({
                    correlationId: subscriber.correlationId,
                    last: false,
                    failed: false
                });

                response.withBody(event);

                me.messageDispatcher.send(subscriber.replyTo, response);
            }));
    }

    unsubscribeDevice(device) {
        const me = this;

        me.filterRegistry.unregisterDevice(device);
    }
}


module.exports = new EventBus();
