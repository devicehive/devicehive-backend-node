const db = require(`../db`);
const ProxyClient = require(`../proxy/ProxyClient.js`);
const ProxyMessageBuilder = require(`../proxy/ProxyMessageBuilder.js`);
const Request = require(`../shim/Request.js`);
const Response = require(`../shim/Response.js`);

const proxyClient = new ProxyClient();

proxyClient.on(`open`, () => {
    proxyClient.send(ProxyMessageBuilder.subscribeTopic({
        topics: [`request_topic`],
        consumerGroup: `request-consumer-group`
    }).toString());
});

proxyClient.on(`notification`, (payload) => {
    const request = Request.normalize(payload);

    // switch (request.body.action) {
    //   case `notif`:
    //     const payload = JSON.parse(p);
    //     if (payload.t = 1) {
    //
    //     }
    //     break;
    // }
});




