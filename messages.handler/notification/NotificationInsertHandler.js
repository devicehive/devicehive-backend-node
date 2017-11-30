const hazelcastService = require(`../../service/hazelcast/HazelcastService.js`);
const NotificationInsertRequestBody = require(`../../common/NotificationInsertRequestBody.js`);
const NotificationInsertResponseBody = require(`../../common/NotificationInsertResponseBody.js`);
const DeviceNotification = require(`../../common/DeviceNotification.js`);
const Response = require(`../../shim/Response.js`);


module.exports = async (request) => {
    const deviceNotification = new NotificationInsertRequestBody(request.body).deviceNotification;
    const response = new Response({ last: false });

    await hazelcastService.store(DeviceNotification.getClassName(), deviceNotification);

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new NotificationInsertResponseBody({ deviceNotification: deviceNotification.toObject() }));

    return response;
};
