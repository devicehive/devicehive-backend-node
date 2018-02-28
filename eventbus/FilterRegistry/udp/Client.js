const udpSocket = require('./udpSocket');

const IFilterRegistry = require(`../IFilterRegistry`);

class Client extends IFilterRegistry {
    constructor(port) {
        super();

        this._socket = udpSocket.createUDP4();
        this._port = port;
        this._host = 'localhost';
    }

    register(filter, subscriber) {
        return this._request('register', { filter, subscriber });
    }

    unregister(subscriber) {
        return this._request('unregister', { subscriber });
    }

    getSubscribers(filter) {
        return this._request('getSubscribers', { filter }).then(res => res.subscribers);
    }

    unregisterDevice(device) {
        return this._request('unregisterDevice', { device });
    }

    _request(method, params = {}) {
        return this._socket.request({ method, ...params }, this._port, this._host);
    }
}

module.exports = Client;
