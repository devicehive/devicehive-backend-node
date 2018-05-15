const debug = require(`debug`)(`request-handler:notification-search`);
const hazelcastService = require(`../../service/hazelcast/HazelcastService`);
const NotificationSearchRequestBody = require(`../../common/model/rpc/NotificationSearchRequestBody`);
const NotificationSearchResponseBody = require(`../../common/model/rpc/NotificationSearchResponseBody`);
const DeviceNotification = require(`../../common/model/DeviceNotification`);
const Response = require(`../../shim/Response`);


/**
 * Notification search request handler
 * @param request
 * @returns {Promise<void>}
 */
module.exports = async (request) => {
    const notificationSearchRequestBody = new NotificationSearchRequestBody(request.body);
    const response = new Response();

    debug(`Request (correlation id: ${request.correlationId}): ${notificationSearchRequestBody}`);

    const notifications = notificationSearchRequestBody.id && notificationSearchRequestBody.deviceId ?
        await searchSingleNotificationByDeviceAndId(notificationSearchRequestBody.id, notificationSearchRequestBody.deviceId) :
        await searchMultipleNotifications(notificationSearchRequestBody);

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new NotificationSearchResponseBody({
        notifications: notifications
    }));

    debug(`Response (correlation id: ${request.correlationId}): ${response.body}`);

    return response;
};

/**
 * Search multiple notifications by predicate
 * @param notificationSearchRequestBody
 * @returns {Promise<Array>}
 */
async function searchMultipleNotifications(notificationSearchRequestBody) {
    const notifications = await hazelcastService.find(DeviceNotification.getClassName(), {
        deviceIds: notificationSearchRequestBody.deviceIds,
        names: notificationSearchRequestBody.names,
        limit: (notificationSearchRequestBody.take || 0) - (notificationSearchRequestBody.skip || 0),
        from: notificationSearchRequestBody.start,
        to: notificationSearchRequestBody.end
    });

    return notifications.map(deviceNotification => deviceNotification.toObject());
}

/**
 * Search one notification by id and deviceId
 * @param id
 * @param deviceId
 * @returns {Promise<Array>}
 */
async function searchSingleNotificationByDeviceAndId(id, deviceId) {
    const notifications = await hazelcastService.find(DeviceNotification.getClassName(), { id: id, deviceIds: [ deviceId ] });

    return notifications.map(deviceNotification => deviceNotification.toObject());
}
