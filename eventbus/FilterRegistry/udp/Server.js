const Const = require(`../constants.json`);
const udpSocket = require('./udpSocket');
const BaseRegistryServer = require('../BaseRegistryServer');
const Filter = require(`../../../common/model/eventbus/Filter`);
const Subscriber = require(`../../../common/model/eventbus/Subscriber`);


/**
 * Filter Registry UDP Server class
 */
class Server extends BaseRegistryServer {

    /**
     * Start Filter Registry UDP server
     */
    static start(port) {
        const server = new Server();
        return server.listen(port);
    }

    constructor() {
        super();

        this._socket = udpSocket.createUDP4();
        this._clientSet = new Set();

        this._socket.on('request', (data, info) => {
            this._clientSet.add(`${info.address}:${info.port}`);

            this._respond(data, info);
        });
    }

    /**
     * Bind server to specific port
     * @param port
     * @returns {Server}
     */
    listen(port) {
        this._socket.bind(port, 'localhost', console.error);
        return this;
    }

    /**
     * Handle request and respond
     * @param data
     * @param info
     * @private
     */
    _respond(data, info) {
        switch(data.params.method) {
            case Const.ACTION.REGISTER:
                this.register(new Filter(data.params.filter), new Subscriber(data.params.subscriber));
                this._sendBroadcast({ method: Const.ACTION.CLEAR_CACHE }, info.port, info.address);
                this._sendResponse({ reqId: data.reqId }, info.port, info.address);
                break;

            case Const.ACTION.UNREGISTER:
                this.unregister(new Subscriber(data.params.subscriber));
                this._sendBroadcast({ method: Const.ACTION.CLEAR_CACHE }, info.port, info.address);
                this._sendResponse({ reqId: data.reqId }, info.port, info.address);
                break;

            case Const.ACTION.GET_SUBSCRIBERS:
                const subscribers = this.getSubscribers(new Filter(data.params.filter));
                this._sendResponse({ subscribers, reqId: data.reqId }, info.port, info.address);
                break;

            case Const.ACTION.UNREGISTER_DEVICE:
                this.unregisterDevice(data.params.device);
                this._sendBroadcast({ method: Const.ACTION.CLEAR_CACHE }, info.port, info.address);
                this._sendResponse({ reqId: data.reqId }, info.port, info.address);
                break;

            default:
                this._sendResponse({ status: 404, reqId: data.reqId }, info.port, info.address);
        }
    }

    /**
     * Respond to request
     * @param message
     * @param port
     * @param host
     * @param callback
     * @private
     */
    _sendResponse(message, ...args) {
        this._socket.send('response', message, ...args);
    }

    /**
     * Send message to all clients
     * @param message
     * @private
     */
    _sendBroadcast(message) {
        this._clientSet.forEach((address) => {
            const [ host, port ] = address.split(`:`);

            this._socket.send('response', message, port, host);
        });
    }
}


module.exports = Server;
