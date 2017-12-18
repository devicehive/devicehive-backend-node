const db = require(`../../db`);
const eventBus = require(`../../eventbus/EventBus.js`);
const hazelcastService = require(`../../service/hazelcast/HazelcastService.js`);
const NotificationSubscribeRequestBody = require(`../../common/model/rpc/NotificationSubscribeRequestBody.js`);
const NotificationSubscribeResponseBody = require(`../../common/model/rpc/NotificationSubscribeResponseBody.js`);
const Subscriber = require(`../../common/model/eventbus/Subscriber.js`);
const Subscription = require(`../../common/model/eventbus/Subscription.js`);
const DeviceNotification = require(`../../common/model/DeviceNotification.js`);
const Response = require(`../../shim/Response.js`);

const NOTIFICATIONS_LIMIT = 100;


module.exports = async (request) => {
    const notificationSubscribeRequestBody = new NotificationSubscribeRequestBody(request.body);
    const response = new Response({ last: false });
    const models = await db.getModels();
    const deviceDAO = models[`Device`];
    const device = await deviceDAO.findOne({ where: { deviceId: notificationSubscribeRequestBody.device }, include: `network` });
    const deviceObject =  device.toObject();
    const networkId = deviceObject.network.id;
    const deviceTypeId = deviceObject.deviceTypeId;

    (notificationSubscribeRequestBody.filter.names || [ undefined ]).forEach((name) => {
        eventBus.subscribe(
            new Subscription({
                networkId: networkId,
                deviceTypeId: deviceTypeId,
                deviceId: notificationSubscribeRequestBody.device,
                eventType: 'notification',
                name: name
            }),
            new Subscriber({
                id: notificationSubscribeRequestBody.subscriptionId,
                replyTo: request.replyTo,
                correlationId: request.correlationId
            }));
    });

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new NotificationSubscribeResponseBody({
        subId: notificationSubscribeRequestBody.subscriptionId,
        notifications: await findNotifications(
            notificationSubscribeRequestBody.device,
            notificationSubscribeRequestBody.filter.names,
            notificationSubscribeRequestBody.timestamp)
    }));

    return response;
};


async function findNotifications(deviceId, names, timestamp) {
    let notifications = [];

    if (timestamp) {
        notifications = (await hazelcastService.find(DeviceNotification.getClassName(),
            { id: deviceId, names: names, from: timestamp, limit: NOTIFICATIONS_LIMIT }))
            .map((deviceNotification) => deviceNotification.toObject());
    }

    return notifications;
}
