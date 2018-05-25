const Const = require(`../constants.json`);
const BaseRegistryServer = require(`../BaseRegistryServer`);
const Xev = require(`xev`).default;
const Filter = require(`../../../common/model/eventbus/Filter`);
const Subscriber = require(`../../../common/model/eventbus/Subscriber`);
const uniqid = require(`uniqid`);


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

            super.register(filter, subscriber);
            me.emit(request.id);
        });

        me.eventEmitter.on(`unregister`, (request) => {
            const requestData = request.data;
            const subscriber = new Subscriber(requestData.subscriber);

            super.unregister(subscriber);
            me.emit(request.id);
        });

        me.eventEmitter.on(`unregisterDevice`, (request) => {
            const requestData = request.data;

            super.unregisterDevice(requestData.device);
            me.emit(request.id);
        });
    }

    /**
     * Registers new subscriber
     * @param filter
     * @param subscriber
     * @param requestOptions
     * @param requestOptions.silent
     * @param requestOptions.distribute
     */
    register(filter, subscriber, { silent, distribute } = {}) {
        const me = this;
        const id = uniqid.process();

        return silent ? Promise.resolve(super.register(filter, subscriber)) : new Promise((resolve) => {
            me.once(id, resolve);
            me.eventEmitter.emit(`request`, { id, action: Const.ACTION.REGISTER, data: { filter, subscriber }, distribute });
        });
    }

    /**
     * Unregisters subscriber
     * @param subscriber
     * @param requestOptions
     * @param requestOptions.silent
     * @param requestOptions.distribute
     */
    unregister(subscriber, { silent, distribute } = {}) {
        const me = this;
        const id = uniqid.process();

        return silent ? Promise.resolve(super.unregister(subscriber)) : new Promise((resolve) => {
            me.once(id, resolve);
            me.eventEmitter.emit(`request`, { id, action: Const.ACTION.UNREGISTER, data: { subscriber }, distribute });
        });
    }

    /**
     * Unregisters device subscription
     * @param device
     * @param requestOptions
     * @param requestOptions.silent
     * @param requestOptions.distribute
     */
    unregisterDevice(device, { silent, distribute } = {}) {
        const me = this;
        const id = uniqid.process();

        return silent ? Promise.resolve(super.unregisterDevice(device)) : new Promise((resolve) => {
            me.once(id, resolve);
            me.eventEmitter.emit(`request`, { id, action: Const.ACTION.UNREGISTER_DEVICE, data: { device }, distribute });
        });
    }
}


module.exports = Client;
