const debug = require(`debug`)(`request-handler:command-update`);
const eventBus = require(`../../eventbus/EventBus`);
const hazelcastService = require(`../../service/hazelcast/HazelcastService`);
const Response = require(`../../shim/Response`);
const CommandUpdateRequestBody = require(`../../common/model/rpc/CommandUpdateRequestBody`);
const DeviceCommand = require(`../../common/model/DeviceCommand`);
const CommandUpdateEvent = require(`../../common/model/eventbus/events/CommandUpdateEvent`);


/**
 * Command update request handler
 * @param request
 * @returns {Promise<void>}
 */
module.exports = async (request) => {
    const commandUpdateRequestBody = new CommandUpdateRequestBody(request.body);
    const response = new Response();

    debug(`Request (correlation id: ${request.correlationId}): ${commandUpdateRequestBody}`);

    await hazelcastService.store(DeviceCommand.getClassName(), commandUpdateRequestBody.deviceCommand);
    eventBus.publish(new CommandUpdateEvent(request.body));

    response.errorCode = 0;
    response.failed = false;

    debug(`Response (correlation id: ${request.correlationId}): ${response.body}`);

    return response;
};
