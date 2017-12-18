const hazelcastService = require(`../../service/hazelcast/HazelcastService`);
const NotificationSearchRequestBody = require(`../../common/model/rpc/NotificationSearchRequestBody`);
const NotificationSearchResponseBody = require(`../../common/model/rpc/NotificationSearchResponseBody`);
const DeviceNotification = require(`../../common/model/DeviceNotification`);
const Response = require(`../../shim/Response`);


module.exports = async (request) => {
    const notificationSearchRequestBody = new NotificationSearchRequestBody(request.body);
    const response = new Response({ last: false });
    const notifications = notificationSearchRequestBody.id && notificationSearchRequestBody.deviceId ?
        searchSingleNotificationByDeviceAndId(notificationSearchRequestBody.id, notificationSearchRequestBody.deviceId) :
        searchMultipleNotifications(notificationSearchRequestBody);

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new NotificationSearchResponseBody({
        notifications: notifications
    }));

    return response;
};


async function searchMultipleNotifications(notificationSearchRequestBody) {
    const notifications = await hazelcastService.find(DeviceNotification.getClassName(), {
        deviceIds: notificationSearchRequestBody.deviceIds,
        names: notificationSearchRequestBody.names,
        limit: (notificationSearchRequestBody.take || 0) - (notificationSearchRequestBody.skip || 0),
        from: notificationSearchRequestBody.start,
        to: notificationSearchRequestBody.end,
        returnUpdated: false,
        status: null
    });

    return notifications;
}


async function searchSingleNotificationByDeviceAndId(id, deviceId) {
    return (await hazelcastService.find(DeviceNotification.getClassName(), { id: id, deviceIds: [ deviceId ] }))
        .map((deviceNotification) => deviceNotification.toObject())
}
