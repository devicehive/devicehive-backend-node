const hazelcastService = require(`../../service/hazelcast/HazelcastService`);
const eventBus = require(`../../eventbus/EventBus`);
const NotificationInsertRequestBody = require(`../../common/model/rpc/NotificationInsertRequestBody`);
const NotificationInsertResponseBody = require(`../../common/model/rpc/NotificationInsertResponseBody`);
const DeviceNotification = require(`../../common/model/DeviceNotification`);
const Response = require(`../../shim/Response`);
const NotificationEvent = require(`../../common/model/eventbus/events/NotificationEvent`);


module.exports = async (request) => {
    const notificationInsertRequestBody = new NotificationInsertRequestBody({ deviceNotification: request.body });
    const deviceNotification = notificationInsertRequestBody.deviceNotification;
    const notificationEvent = new NotificationEvent(request.body);
    const response = new Response({ last: false });

    eventBus.publish(notificationEvent);
    await hazelcastService.store(DeviceNotification.getClassName(), deviceNotification);

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new NotificationInsertResponseBody({ deviceNotification: deviceNotification.toObject() }));

    return response;
};
