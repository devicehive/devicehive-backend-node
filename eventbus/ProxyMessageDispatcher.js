const { MessageBuilder } = require(`devicehive-proxy-message`);
const proxyClient = require(`../proxy/ProxyClient.js`);
const MessageDispatcher = require(`../shim/server/MessageDispatcher.js`);


class ProxyMessageDispatcher extends MessageDispatcher {

    send(to, response) {
        proxyClient.sendMessage(MessageBuilder.createNotification({
            topic: to,
            message: response.toString()
        }));
    }
}


module.exports = ProxyMessageDispatcher;
