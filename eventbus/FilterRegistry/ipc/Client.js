const Const = require(`../constants.json`);
const IFilterRegistry = require(`../IFilterRegistry`);
const Xev = require(`xev`).default;
const shortId = require(`shortid`);


/**
 * Filter Registry Client class
 */
class Client extends IFilterRegistry {

    /**
     * Creates new Filter Registry Client
     */
    constructor() {
        super();

        const me = this;

        me.eventEmitter = new Xev();
    }

    /**
     * Registers new subscriber
     * @param filter
     * @param subscriber
     */
    register(filter, subscriber) {
        const me = this;
        const id = shortId.generate();
        const action = Const.ACTION.REGISTER;

        return new Promise((resolve) => {
            me.eventEmitter.once(`${id}-${action}`, resolve);
            me.eventEmitter.emit(`request`, { id, action, data: { filter, subscriber } });
        });
    }

    /**
     * Unregisters subscriber
     * @param subscriber
     */
    unregister(subscriber) {
        const me = this;
        const id = shortId.generate();
        const action = Const.ACTION.UNREGISTER;

        return new Promise((resolve) => {
            me.eventEmitter.once(`${id}-${action}`, resolve);
            me.eventEmitter.emit(`request`, { id, action, data: { subscriber } });
        });
    }

    /**
     * Returns subscribers by filter
     * @param filter
     * @returns {Promise<Array<Subscriber>>}
     */
    getSubscribers(filter) {
        const me = this;
        const id = shortId.generate();
        const action = Const.ACTION.GET_SUBSCRIBERS;

        return new Promise((resolve) => {
            me.eventEmitter.once(`${id}-${action}`, resolve);
            me.eventEmitter.emit(`request`, { id, action, data: { filter } });
        });
    }

    /**
     * Unregisters device subscription
     * @param device
     */
    unregisterDevice(device) {
        const me = this;
        const id = shortId.generate();
        const action = Const.ACTION.UNREGISTER_DEVICE;

        return new Promise((resolve) => {
            me.eventEmitter.once(`${id}-${action}`, resolve);
            me.eventEmitter.emit(`request`, { id, action, data: { device } });
        });
    }
}


module.exports = Client;
