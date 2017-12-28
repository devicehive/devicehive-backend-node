const { MessageBuilder } = require(`devicehive-proxy-message`);
const proxyClient = require(`../proxy/ProxyClient`);


class ProxyMessageDispatcher {

    send(to, response) {
        proxyClient.sendMessage(MessageBuilder.createNotification({
            topic: to,
            message: response.toString()
        }));
    }
}


module.exports = ProxyMessageDispatcher;
