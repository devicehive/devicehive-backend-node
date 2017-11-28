const db = require(`../../db`);
const eventBus = require(`../../eventbus/EventBus.js`);
const Subscriber = require(`../../common/Subscriber.js`);
const NotificationSubscribeRequest = require(`../../common/NotificationSubscribeRequest.js`);
const Response = require(`../../shim/Response.js`);
const Action = require(`../../shim/Action.js`);


module.exports = async (request) => {
    const notificationSubscribeRequest = new NotificationSubscribeRequest(request.body);
    const response = new Response({ last: false });
    const models = await db.getModels();
    const deviceDAO = models[`Device`];
    const device = await deviceDAO.findOne({ where: { deviceId: notificationSubscribeRequest.device }, include: `network` });
    const networkId = device.toObject().network.id;
    const subscriber = new Subscriber({
        id: notificationSubscribeRequest.subscriptionId,
        replyTo: request.replyTo,
        correlationId: request.correlationId
    });

    console.log(notificationSubscribeRequest.device);
    eventBus.subscribe(
        networkId,
        0,
        notificationSubscribeRequest.device,
        'notification',
        notificationSubscribeRequest.filter.name,
        subscriber);

    response.errorCode = 0;
    response.failed = false;
    response.withBody({
        action: Action.NOTIFICATION_SUBSCRIBE_RESPONSE,
        //subId:
    });

    return response;
};
