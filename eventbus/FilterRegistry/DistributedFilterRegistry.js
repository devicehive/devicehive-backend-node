const proxyClient = require(`../../proxy/ProxyClient`);
const { MessageBuilder } = require(`devicehive-proxy-message`);
const SubscribeMessage = require(`../../shim/SubscribeMessage`);
const IFilterRegistry = require(`./IFilterRegistry`);


/**
 *
 */
class DistributedFilterRegistry extends IFilterRegistry {

    static get SUBSCRIPTION_TOPIC() { return `subscription_update`; }

    /**
     *
     */
    constructor() {
        super();

        proxyClient.sendMessage(MessageBuilder.subscribeTopic({
            topicList: [ DistributedFilterRegistry.SUBSCRIPTION_TOPIC ]
        }));
    }

    /**
     *
     * @param filter
     * @param subscriber
     */
    register(filter, subscriber) {
        const subscribeMessage = new SubscribeMessage({
            action: SubscribeMessage.REGISTER_ACTION,
            filter: filter,
            subscriber: subscriber
        });

        proxyClient.sendMessage(MessageBuilder.createNotification({
            topic: DistributedFilterRegistry.SUBSCRIPTION_TOPIC,
            message: subscribeMessage.toString()
        }));
    }

    /**
     *
     * @param subscriber
     */
    unregister(subscriber) {
        const subscribeMessage = new SubscribeMessage({
            action: SubscribeMessage.UNREGISTER_ACTION,
            subscriber: subscriber
        });

        proxyClient.sendMessage(MessageBuilder.createNotification({
            topic: DistributedFilterRegistry.SUBSCRIPTION_TOPIC,
            message: subscribeMessage.toString()
        }));
    }

    /**
     *
     * @param device
     */
    unregisterDevice(device) {
        const subscribeMessage = new SubscribeMessage({
            action: SubscribeMessage.UNREGISTER_DEVICE_ACTION,
            device: device
        });

        proxyClient.sendMessage(MessageBuilder.createNotification({
            topic: DistributedFilterRegistry.SUBSCRIPTION_TOPIC,
            message: subscribeMessage.toString()
        }));
    }
}


module.exports = DistributedFilterRegistry;
