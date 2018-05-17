const dgram = require('dgram');
const EventEmitter = require('events');
const uniqid = require(`uniqid`);


/**
 * UDP Socket class
 */
class Socket extends EventEmitter {

    /**
     * Creates socket based on UDP4
     * @returns {Socket}
     */
    static createUDP4() {
        return new Socket('udp4');
    }

    /**
     * Creates Socket instance
     * @param udpV UDP version to use
     */
    constructor(udpV) {
        super();

        this._socket = dgram.createSocket(udpV);
        this._requests = new Map();
        this._requestTimeout = 10000;

        this._handleMessages()._handleResponses();

    }

    /**
     * Handle each message and emit appropriate event based on channel
     * @returns {Socket}
     * @private
     */
    _handleMessages() {
        this._socket.on('message', (payloadBuffer, info) => {
            const payload = this._parsePayload(payloadBuffer.toString());
            this.emit(payload.channel, payload.message || payload, info);
        });

        return this;
    }

    /**
     * Handle response for request and resolve request's promise if there is some pending
     * @returns {Socket}
     * @private
     */
    _handleResponses() {
        this.on('response', (res, info) => {
            const pending = res.reqId && this._requests.get(res.reqId);
            if (pending) {
                pending.respond(res);
                this._requests.delete(res.reqId);
            } else if (res.method) {
                this.emit(res.method);
            }
        });

        return this;
    }

    /**
     * Parse message payload, return null in case of error
     * @param rawMessage
     * @returns {Object|null}
     * @private
     */
    _parsePayload(rawMessage) {
        try {
            return JSON.parse(rawMessage);
        } catch(err) {
            return null;
        }
    }

    /**
     * Prepare message payload
     * @param payloadData
     * @returns {String}
     * @private
     */
    _preparePayload(payloadData) {
        return JSON.stringify(payloadData);
    }

    /**
     * Bind UDP socket to specific port
     * @param port
     * @param host
     * @param callback
     * @returns {Socket}
     */
    bind(...args) {
        this._socket.bind(...args);
        return this;
    }

    /**
     * Close UDP socket
     * @param callback
     * @returns {Socket}
     */
    close(...args) {
        this._socket.close(...args);
        return this;
    }

    /**
     * Send message for specific channel
     * @param channel
     * @param message
     * @param port
     * @param host
     * @param callback
     * @returns {Socket}
     */
    send(channel, message, ...args) {
        const payload = this._preparePayload({ channel, message });
        this._socket.send(payload, ...args);

        return this;
    }

    /**
     * Send request over UDP
     * @param params
     * @param port
     * @param host
     * @param callback
     * @returns {Promise<*>}
     */
    request(params, port, host, callback = () => {}) {
        const reqId = uniqid.process();
        const payload = this._preparePayload({ channel: 'request', params, reqId });

        return new Promise((resolve, reject) => {
            this._requests.set(reqId, {
                respond: resolve
            });

            this._socket.send(payload, port, host, callback);

            setTimeout(() => {
                this._requests.delete(reqId);
                reject(new Error('UDP Socket request timeout'));
            }, this._requestTimeout);
        });
    }

    /**
     * Set timeout for requests
     * @param value
     */
    requestTimeout(value) {
        if (value > 0) {
            this._requestTimeout = value;
        }
    }
}


module.exports = Socket;
