const Const = require(`../constants.json`);
const BaseRegistryServer = require(`../BaseRegistryServer`);
const Xev = require(`xev`).default;
const Filter = require(`../../../common/model/eventbus/Filter`);
const Subscriber = require(`../../../common/model/eventbus/Subscriber`);


/**
 * Filter Registry IPC Client class
 */
class Client extends BaseRegistryServer {

    /**
     * Creates new Filter Registry Client
     */
    constructor() {
        super();

        const me = this;

        me.eventEmitter = new Xev();

        me.eventEmitter.on(`register`, (request) => {
            const requestData = request.data;
            const filter = new Filter(requestData.filter);
            const subscriber = new Subscriber(requestData.subscriber);

            me.register(filter, subscriber);
        });

        me.eventEmitter.on(`unregister`, (request) => {
            const requestData = request.data;
            const subscriber = new Subscriber(requestData.subscriber);

            me.unregister(subscriber);
        });

        me.eventEmitter.on(`unregisterDevice`, (request) => {
            const requestData = request.data;

            me.unregisterDevice(requestData.device);
        });
    }

    /**
     * Registers new subscriber
     * @param filter
     * @param subscriber
     */
    registerRequest(filter, subscriber) {
        const me = this;

        me.eventEmitter.emit(`request`, { action: Const.ACTION.REGISTER, data: { filter, subscriber } });
    }

    /**
     * Unregisters subscriber
     * @param subscriber
     */
    unregisterRequest(subscriber) {
        const me = this;

        me.eventEmitter.emit(`request`, { action: Const.ACTION.UNREGISTER, data: { subscriber } });
    }

    /**
     * Unregisters device subscription
     * @param device
     */
    unregisterDeviceRequest(device) {
        const me = this;

        me.eventEmitter.emit(`request`, { action: Const.ACTION.UNREGISTER_DEVICE, data: { device } });
    }
}


module.exports = Client;
