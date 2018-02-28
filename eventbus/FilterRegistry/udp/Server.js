const udpSocket = require('./udpSocket');

const BaseRegistryServer = require('../BaseRegistryServer');
const Filter = require(`../../../common/model/eventbus/Filter`);
const Subscriber = require(`../../../common/model/eventbus/Subscriber`);

class Server extends BaseRegistryServer {
    /**
     * Start Filter Registry server
     */
    static start(port) {
        const server = new Server();
        return server.listen(port);
    }

    constructor() {
        super();

        this._socket = udpSocket.createUDP4();

        this._socket.on('request', (data, info) => {
            this._respond(data, info);
        });
    }

    listen(port) {
        this._socket.bind(port, 'localhost', console.error);
        return this;
    }

    _respond(data, info) {
        switch(data.params.method) {
            case 'register':
                this.register(new Filter(data.params.filter), new Subscriber(data.params.subscriber));
                this._sendResponse({ reqId: data.reqId }, info.port, info.address);
                break;

            case 'unregister':
                this.unregister(new Subscriber(data.params.subscriber));
                this._sendResponse({ reqId: data.reqId }, info.port, info.address);
                break;

            case 'getSubscribers':
                const subscribers = this.getSubscribers(new Filter(data.params.filter));
                this._sendResponse({ subscribers, reqId: data.reqId }, info.port, info.address);
                break;

            case 'unregisterDevice':
                this.unregisterDevice(data.params.device);
                this._sendResponse({ reqId: data.reqId }, info.port, info.address);
                break;

            default:
                this._sendResponse({ status: 404, reqId: data.reqId }, info.port, info.address);
        }
    }

    _sendResponse(message, ...args) {
        this._socket.send('response', message, ...args);
    }
}

module.exports = Server;
