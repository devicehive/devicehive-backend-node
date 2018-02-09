const { MessageBuilder } = require(`devicehive-proxy-message`);
const proxyClient = require(`../proxy/ProxyClient`);


/**
 * ProxyMessageDispatcher class
 */
class ProxyMessageDispatcher {

    /**
     * Send message
     * @param to destination topic
     * @param response response message
     */
    static send(to, response) {
        proxyClient.sendMessage(MessageBuilder.createNotification({
            topic: to,
            message: response.toString()
        }));
    }
}


module.exports = ProxyMessageDispatcher;
