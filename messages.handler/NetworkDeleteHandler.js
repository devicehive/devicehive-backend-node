const debug = require(`debug`)(`request-handler:device-delete`);
const eventBus = require(`../eventbus/EventBus`);
const NetworkDeleteRequestBody = require(`../common/model/rpc/NetworkDeleteRequestBody`);
const NetworkDeleteResponseBody = require(`../common/model/rpc/NetworkDeleteResponseBody`);
const Response = require(`../shim/Response`);


/**
 * Network delete request handler
 * @param request
 * @returns {Promise<void>}
 */
module.exports = async (request) => {
    const networkDeleteRequestBody = new NetworkDeleteRequestBody(request.body);
    const response = new Response({ last: false });

    debug(`Request (correlation id: ${request.correlationId}): ${networkDeleteRequestBody}`);

    networkDeleteRequestBody.devices.forEach(device => {
        eventBus.unsubscribeDevice(device);
    });

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new NetworkDeleteResponseBody());

    debug(`Response (correlation id: ${request.correlationId}): ${response.body}`);

    return response;
};
