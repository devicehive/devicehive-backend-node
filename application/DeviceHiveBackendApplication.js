const db = require(`../db`);
const ProxyClient = require(`../proxy/ProxyClient.js`);
const Request = require(`../shim/Request.js`);
const Response = require(`../shim/Response.js`);

const proxyClient = new ProxyClient();

proxyClient.on(`open`, () => {
  proxyClient.send(JSON.stringify({
    id:"f886e71c-13c7-40a9-8dbc-c63c5b07ef94",
    t:"topic",
    a:"subscribe",
    p: {
      t: ["request_topic"],
      consumer_group:"request-consumer-group"
    }
  }));
});

proxyClient.on(`notification`, (payload) => {
  const request = Request.build(payload);

  // switch (request.body.action) {
  //   case `notif`:
  //     const payload = JSON.parse(p);
  //     if (payload.t = 1) {
  //
  //     }
  //     break;
  // }
});

// db.getModels()
//   .then((models) => {
//     debugger;
//   })
//   .catch(() => {
//   });
