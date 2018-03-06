const Const = require(`../constants.json`);
const udpSocket = require('./udpSocket');
const IFilterRegistry = require(`../IFilterRegistry`);
const LRU = require(`lru`);


/**
 * Filter Registry UDP Client class
 */
class Client extends IFilterRegistry {
    /**
     * Creates new Filter Registry Client
     * @param port Server port
     */
    constructor(port) {
        super();

        this._socket = udpSocket.createUDP4();
        this._port = port;
        this._host = 'localhost';
        this._cache = new LRU(Const.CACHE_MAX_ITEMS);

        this._socket.on(Const.ACTION.CLEAR_CACHE, () => {
            this._cache.clear();
        })
    }

    /**
     * Registers new subscriber
     * @param filter
     * @param subscriber
     */
    register(filter, subscriber) {
        this._cache.clear();

        return this._request(Const.ACTION.REGISTER, { filter, subscriber });
    }

    /**
     * Unregisters subscriber
     * @param subscriber
     */
    unregister(subscriber) {
        this._cache.clear();

        return this._request(Const.ACTION.UNREGISTER, { subscriber });
    }

    /**
     * Returns subscribers by filter
     * @param filter
     * @returns {Promise<Array<Subscriber>>}
     */
    getSubscribers(filter) {
        const cachedValue = this._cache.get(`${filter.getFirstKey()}${filter.getSecondKey()}`);

        return cachedValue ?
            Promise.resolve(cachedValue) :
            this._request(Const.ACTION.GET_SUBSCRIBERS, { filter }).then(res => {
                this._cache.set(`${filter.getFirstKey()}${filter.getSecondKey()}`, res.subscribers);

                return res.subscribers;
            });
    }

    /**
     * Unregisters device subscription
     * @param device
     */
    unregisterDevice(device) {
        this._cache.clear();

        return this._request(Const.ACTION.UNREGISTER_DEVICE, { device });
    }

    /**
     * Send request over UDP to server
     * @param method
     * @param [params={}]
     * @returns {Promise<*>}
     * @private
     */
    _request(method, params = {}) {
        return this._socket.request({ method, ...params }, this._port, this._host);
    }
}


module.exports = Client;
