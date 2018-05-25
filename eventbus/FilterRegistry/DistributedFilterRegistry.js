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

        proxyClient.on(`open`, () => {
            proxyClient.sendMessage(MessageBuilder.subscribeTopic({
                topicList: [ DistributedFilterRegistry.SUBSCRIPTION_TOPIC ]
            }));
        });
    }

    /**
     *
     * @param filter
     * @param subscriber
     * @param id
     */
    register(filter, subscriber, id) {
        const subscribeMessage = new SubscribeMessage({
            id: id,
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
     * @param id
     */
    unregister(subscriber, id) {
        const subscribeMessage = new SubscribeMessage({
            id: id,
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
     * @param id
     */
    unregisterDevice(device, id) {
        const subscribeMessage = new SubscribeMessage({
            id: id,
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
