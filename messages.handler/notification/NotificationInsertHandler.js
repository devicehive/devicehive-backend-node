const debug = require(`debug`)(`request-handler:notification-insert`);
const hazelcastService = require(`../../service/hazelcast/HazelcastService`);
const eventBus = require(`../../eventbus/EventBus`);
const NotificationInsertRequestBody = require(`../../common/model/rpc/NotificationInsertRequestBody`);
const NotificationInsertResponseBody = require(`../../common/model/rpc/NotificationInsertResponseBody`);
const DeviceNotification = require(`../../common/model/DeviceNotification`);
const Response = require(`../../shim/Response`);
const NotificationEvent = require(`../../common/model/eventbus/events/NotificationEvent`);


/**
 * Notification insert request handler
 * @param request
 * @returns {Promise<void>}
 */
module.exports = async (request) => {
    const notificationInsertRequestBody = new NotificationInsertRequestBody(request.body);
    const deviceNotification = notificationInsertRequestBody.deviceNotification;
    const notificationEvent = new NotificationEvent(request.body);
    const response = new Response();

    debug(`Request (correlation id: ${request.correlationId}): ${notificationInsertRequestBody}`);

    eventBus.publish(notificationEvent);
    await hazelcastService.store(DeviceNotification.getClassName(), deviceNotification);

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new NotificationInsertResponseBody({ deviceNotification: deviceNotification.toObject() }));

    debug(`Response (correlation id: ${request.correlationId}): ${response.body}`);

    return response;
};
