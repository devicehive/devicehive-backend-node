const debug = require(`debug`)(`request-handler:device-delete`);
const eventBus = require(`../eventbus/EventBus`);
const DeviceTypeDeleteRequestBody = require(`../common/model/rpc/DeviceTypeDeleteRequestBody`);
const DeviceTypeDeleteResponseBody = require(`../common/model/rpc/DeviceTypeDeleteResponseBody`);
const Response = require(`../shim/Response`);


/**
 * Device type delete request handler
 * @param request
 * @returns {Promise<void>}
 */
module.exports = async (request) => {
    const deviceTypeDeleteRequestBody = new DeviceTypeDeleteRequestBody(request.body);
    const response = new Response({ last: false });

    debug(`Request (correlation id: ${request.correlationId}): ${deviceTypeDeleteRequestBody}`);

    deviceTypeDeleteRequestBody.devices.forEach(device => {
        eventBus.unsubscribeDevice(device);
    });

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new DeviceTypeDeleteResponseBody());

    debug(`Response (correlation id: ${request.correlationId}): ${response.body}`);

    return response;
};
