const EventEmitter = require(`events`);
const WS = require(`ws`);

const ProxyMessage = require(`./ProxyMessage.js`);


const MAX_LISTENERS = 20;

class ProxyClient extends EventEmitter {

  constructor() {
    super();

    const me = this;

    me.ws = new WS(`ws://localhost:3000`);
    me.ws.setMaxListeners(MAX_LISTENERS);

    me.ws.addEventListener(`open`, () => {
      me.emit(`open`);
    });

    me.ws.addEventListener(`close`, () => {
      me.emit(`close`);
    });

    me.ws.addEventListener(`message`, (event) => {
      let messages = JSON.parse(event.data);
      messages = messages.length ? messages : [messages];

      messages.forEach((message) => {
        const proxyMessage = ProxyMessage.build(message);

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

module.exports = ProxyClient;
