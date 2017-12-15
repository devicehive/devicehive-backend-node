const PROXY_CONFIG = require(`./config.json`);
const WS = require(`ws`);
const EventEmitter = require(`events`);
const { Message } = require(`devicehive-proxy-message`);
const debug = require(`debug`)(`proxy-client`);


/**
 * DeviceHive WebSocket Proxy client
 */
class ProxyClient extends EventEmitter {

    constructor(webSocketServerUrl = PROXY_CONFIG.WS_PROXY_ENDPOINT) {
        super();

        const me = this;

        me.ws = new WS(webSocketServerUrl);

        me.ws.addEventListener(`open`, () => {
            process.nextTick(() => me.emit(`open`));
            debug(`Connected to ${webSocketServerUrl}`);
        });

        me.ws.addEventListener(`close`, () => {
            process.nextTick(() => me.emit(`close`));
            debug(`Connection has been closed`);
        });

        me.ws.addEventListener(`error`, (error) => {
            me.emit(`error`, error);
            debug(`Proxy client error: ${error}`);
        });

        me.ws.addEventListener(`ping`, (pingData) => {
            me.emit(`ping`, pingData);
            debug(`Ping from WebSocket server`);
        });

        me.ws.addEventListener(`message`, (event) => {
            try {
                let messages = JSON.parse(event.data);
                messages = messages.length ? messages : [messages];

                messages.forEach((message) => me.emit(`message`, Message.normalize(message)));
            } catch (error) {
                debug(`Error on incoming message: ${error}`);
            }
        });
    }

    sendMessage(message=new Message()) {
        const me = this;

        me.ws.send(message.toString());
    }
}


module.exports = new ProxyClient();

