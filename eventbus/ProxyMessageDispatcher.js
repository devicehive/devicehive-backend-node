const proxyClient = require(`../proxy/ProxyClient.js`);
const MessageDispatcher = require(`../shim/server/MessageDispatcher.js`);
const ProxyMessageBuilder = require(`../proxy/ProxyMessageBuilder.js`);


class ProxyMessageDispatcher extends MessageDispatcher {

    send(to, response) {
        proxyClient.send(ProxyMessageBuilder.createNotification({
            topic: to,
            message: response.toString()
        }).toString());
    }
}


module.exports = ProxyMessageDispatcher;
