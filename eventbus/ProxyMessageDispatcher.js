const { MessageBuilder } = require(`devicehive-proxy-message`);
const proxyClient = require(`../proxy/ProxyClient`);
const MessageDispatcher = require(`../shim/server/MessageDispatcher`);


class ProxyMessageDispatcher extends MessageDispatcher {

    send(to, response) {
        proxyClient.sendMessage(MessageBuilder.createNotification({
            topic: to,
            message: response.toString()
        }));
    }
}


module.exports = ProxyMessageDispatcher;
