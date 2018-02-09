const debug = require(`debug`)(`request-handler:device-delete`);
const eventBus = require(`../eventbus/EventBus`);
const DeviceDeleteRequestBody = require(`../common/model/rpc/DeviceDeleteRequestBody`);
const DeviceDeleteResponseBody = require(`../common/model/rpc/DeviceDeleteResponseBody`);
const Response = require(`../shim/Response`);


/**
 * Device delete request handler
 * @param request
 * @returns {Promise<void>}
 */
module.exports = async (request) => {
    const deviceDeleteRequestBody = new DeviceDeleteRequestBody(request.body);
    const response = new Response({ last: false });

    debug(`Request (correlation id: ${request.correlationId}): ${deviceDeleteRequestBody}`);

    eventBus.unsubscribeDevice(deviceDeleteRequestBody.device);

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new DeviceDeleteResponseBody());

    debug(`Response (correlation id: ${request.correlationId}): ${response.body}`);

    return response;
};
