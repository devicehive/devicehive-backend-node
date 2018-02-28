const dgram = require('dgram');
const EventEmitter = require('events');
const shortId = require(`shortid`);

class Socket extends EventEmitter {
    static createUDP4() {
        return new Socket('udp4');
    }

    constructor(udpV) {
        super();

        this._socket = dgram.createSocket(udpV);
        this._requests = new Map();
        this._requestTimeout = 10000;

        this._handleMessages()._handleResponses();

    }

    _handleMessages() {
        this._socket.on('message', (payloadBuffer, info) => {
            const payload = this._parsePayload(payloadBuffer.toString());
            this.emit(payload.channel, payload.message || payload, info);
        });

        return this;
    }

    _handleResponses() {
        this.on('response', (res, info) => {
            const pending = res.reqId && this._requests.get(res.reqId);
            if (pending) {
                pending.respond(res);
                this._requests.delete(res.reqId);
            }
        });
    }

    _parsePayload(rawMessage) {
        try {
            return JSON.parse(rawMessage);
        } catch(err) {
            return null;
        }
    }

    _preparePayload(payloadData) {
        return JSON.stringify(payloadData);
    }

    bind(...args) {
        this._socket.bind(...args);
        return this;
    }

    close(...args) {
        this._socket.close(...args);
        return this;
    }

    send(channel, message, ...args) {
        const payload = this._preparePayload({ channel, message });
        this._socket.send(payload, ...args);

        return this;
    }

    request(params, port, host, callback = () => {}) {
        const reqId = shortId.generate();
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

    requestTimeout(value) {
        if (value > 0) {
            this._requestTimeout = value;
        }
    }
}

module.exports = Socket;
