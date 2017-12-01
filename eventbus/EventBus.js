const SubscriptionRegistry = require(`./SubscriptionRegistry.js`);
const MessageDispatcher = require(`./ProxyMessageDispatcher.js`);
const Response = require(`../shim/Response.js`);


class EventBus {

    constructor() {
        const me = this;

        me.subscriptionRegistry = new SubscriptionRegistry();
        me.messageDispatcher = new MessageDispatcher();
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
        const me = this;

        event.getApplicableSubscriptions()
            .map((subscription) => me.subscriptionRegistry.getSubscribers(subscription))
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
