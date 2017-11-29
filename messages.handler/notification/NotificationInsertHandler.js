const hazelcastService = require(`../../service/hazelcast/HazelcastService.js`);
const NotificationInsertRequestBody = require(`../../common/NotificationInsertRequestBody.js`);
const NotificationInsertResponseBody = require(`../../common/NotificationInsertResponseBody.js`);
const Response = require(`../../shim/Response.js`);

module.exports = async (request) => {
    const deviceNotification = new NotificationInsertRequestBody(request.body).deviceNotification;
    const response = new Response({ last: false });

    hazelcastService.store(deviceNotification);

    return response;
};
