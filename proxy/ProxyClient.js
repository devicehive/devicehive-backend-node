const PROXY_CONFIG = require(`./config.json`);
const EventEmitter = require(`events`);
const WS = require(`ws`);

const ProxyMessage = require(`./ProxyMessage.js`);


const MAX_LISTENERS = 20;

class ProxyClient extends EventEmitter {

    constructor() {
        super();

        const me = this;

        me.ws = new WS(PROXY_CONFIG.WS_PROXY_ENDPOINT,
            { headers: { [`${PROXY_CONFIG.DH_SERVICE_HEADER_KEY}`]: `${PROXY_CONFIG.DH_SERVICE_HEADER_VALUE}` } });

        me.ws.setMaxListeners(MAX_LISTENERS);

        me.ws.addEventListener(`open`, () => process.nextTick(() => me.emit(`open`)));
        me.ws.addEventListener(`close`, () => me.emit(`close`));

        me.ws.addEventListener(`message`, (event) => {
            let messages = JSON.parse(event.data);
            messages = messages.length ? messages : [messages];

            messages.forEach((message) => {
                const proxyMessage = ProxyMessage.normalize(message);

                if (proxyMessage.type === `notif` && !proxyMessage.action) {
                    me.emit(`notification`, JSON.parse(proxyMessage.payload));
                }
            });
        });
    }

    send(data) {
        const me = this;

        me.ws.send(data);
    }
}

module.exports = new ProxyClient();
