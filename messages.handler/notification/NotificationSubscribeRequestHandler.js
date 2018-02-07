const debug = require(`debug`)(`request-handler:notification-subscribe`);
const eventBus = require(`../../eventbus/EventBus`);
const hazelcastService = require(`../../service/hazelcast/HazelcastService`);
const NotificationSubscribeRequestBody = require(`../../common/model/rpc/NotificationSubscribeRequestBody`);
const NotificationSubscribeResponseBody = require(`../../common/model/rpc/NotificationSubscribeResponseBody`);
const Subscriber = require(`../../common/model/eventbus/Subscriber`);
const DeviceNotification = require(`../../common/model/DeviceNotification`);
const Response = require(`../../shim/Response`);

const NOTIFICATIONS_LIMIT = 100;


/**
 * Notification subscription request handler
 * @param request
 * @returns {Promise<void>}
 */
module.exports = async (request) => {
    const notificationSubscribeRequestBody = new NotificationSubscribeRequestBody(request.body);
    const response = new Response({ last: false });

    debug(`Request (correlation id: ${request.correlationId}): ${notificationSubscribeRequestBody}`);

    eventBus.subscribe(
        notificationSubscribeRequestBody.filter,
        new Subscriber({
            id: notificationSubscribeRequestBody.subscriptionId,
            replyTo: request.replyTo,
            correlationId: request.correlationId
        }));

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new NotificationSubscribeResponseBody({
        subId: notificationSubscribeRequestBody.subscriptionId,
        notifications: await findNotifications(
            notificationSubscribeRequestBody.filter,
            notificationSubscribeRequestBody.names,
            notificationSubscribeRequestBody.timestamp)
    }));

    debug(`Response (correlation id: ${request.correlationId}): ${response.body}`);

    return response;
};

/**
 * Find notification which corresponds to subscription filter (in case if timestamp is present)
 * @param filter
 * @param names
 * @param timestamp
 * @returns {Promise<Array>}
 */
async function findNotifications(filter, names, timestamp) {
    let notifications = [];

    if (timestamp) {
        notifications = (await hazelcastService.find(DeviceNotification.getClassName(), {
            deviceIds: [ filter.deviceId ],
            networkIds: [ filter.networkId ],
            deviceTypeIds: [ filter.deviceTypeId ],
            names: names,
            from: timestamp,
            status: null,
            limit: NOTIFICATIONS_LIMIT
        })).map((deviceNotification) => deviceNotification.toObject());
    }

    return notifications;
}
