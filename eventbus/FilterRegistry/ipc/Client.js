const Const = require(`../constants.json`);
const IFilterRegistry = require(`../IFilterRegistry`);
const Xev = require(`xev`).default;
const uniqid = require(`uniqid`);
const LRU = require(`lru`);


/**
 * Filter Registry IPC Client class
 */
class Client extends IFilterRegistry {

    /**
     * Creates new Filter Registry Client
     */
    constructor() {
        super();

        const me = this;

        me.eventEmitter = new Xev();
        me.cache = new LRU(Const.CACHE_MAX_ITEMS);

        me.eventEmitter.on(Const.ACTION.CLEAR_CACHE, () => {
            me.cache.clear();
        });
    }

    /**
     * Registers new subscriber
     * @param filter
     * @param subscriber
     */
    register(filter, subscriber) {
        const me = this;
        const id = uniqid.process();
        const action = Const.ACTION.REGISTER;

        me.cache.clear();

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
        const id = uniqid.process();
        const action = Const.ACTION.UNREGISTER;

        me.cache.clear();

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
        const cachedValue = me.cache.get(filter.getComplexKey());

        return cachedValue ? Promise.resolve(cachedValue) : new Promise((resolve) => {
            const id = uniqid.process();
            const action = Const.ACTION.GET_SUBSCRIBERS;
            me.eventEmitter.once(`${id}-${action}`, (subscribers) => {
                me.cache.set(filter.getComplexKey(), subscribers);
                resolve(subscribers);
            });
            me.eventEmitter.emit(`request`, { id, action, data: { filter } });
        });
    }

    /**
     * Unregisters device subscription
     * @param device
     */
    unregisterDevice(device) {
        const me = this;
        const id = uniqid.process();
        const action = Const.ACTION.UNREGISTER_DEVICE;

        me.cache.clear();

        return new Promise((resolve) => {
            me.eventEmitter.once(`${id}-${action}`, resolve);
            me.eventEmitter.emit(`request`, { id, action, data: { device } });
        });
    }
}


module.exports = Client;
