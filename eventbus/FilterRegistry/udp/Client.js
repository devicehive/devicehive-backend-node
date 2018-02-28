const udpSocket = require('./udpSocket');

const IFilterRegistry = require(`../IFilterRegistry`);

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
    }

    /**
     * Registers new subscriber
     * @param filter
     * @param subscriber
     */
    register(filter, subscriber) {
        return this._request('register', { filter, subscriber });
    }

    /**
     * Unregisters subscriber
     * @param subscriber
     */
    unregister(subscriber) {
        return this._request('unregister', { subscriber });
    }

    /**
     * Returns subscribers by filter
     * @param filter
     * @returns {Promise<Array<Subscriber>>}
     */
    getSubscribers(filter) {
        return this._request('getSubscribers', { filter }).then(res => res.subscribers);
    }

    /**
     * Unregisters device subscription
     * @param device
     */
    unregisterDevice(device) {
        return this._request('unregisterDevice', { device });
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
