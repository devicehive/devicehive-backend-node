const SubscriptionRegistry = require(`./SubscriptionRegistry`);
const MessageDispatcher = require(`./ProxyMessageDispatcher`);
const Response = require(`../shim/Response`);


class EventBus {

    constructor() {
        const me = this;

        me.filterRegistry = new SubscriptionRegistry();
        me.messageDispatcher = new MessageDispatcher();
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
            .map((filter) => me.filterRegistry.getSubscribers(filter))
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
}


module.exports = new EventBus();
