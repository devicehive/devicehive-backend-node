const debug = require(`debug`)(`request-handler:command-insert`);
const hazelcastService = require(`../../service/hazelcast/HazelcastService`);
const eventBus = require(`../../eventbus/EventBus`);
const CommandInsertRequestBody = require(`../../common/model/rpc/CommandInsertRequestBody`);
const CommandInsertResponseBody = require(`../../common/model/rpc/CommandInsertResponseBody`);
const DeviceCommand = require(`../../common/model/DeviceCommand`);
const Response = require(`../../shim/Response`);
const CommandEvent = require(`../../common/model/eventbus/events/CommandEvent`);


/**
 * Command insert request handler
 * @param request
 * @returns {Promise<void>}
 */
module.exports = async (request) => {
    const commandInsertRequestBody = new CommandInsertRequestBody(request.body);
    const deviceCommand = commandInsertRequestBody.deviceCommand;
    const commandEvent = new CommandEvent(request.body);
    const response = new Response();

    debug(`Request (correlation id: ${request.correlationId}): ${commandInsertRequestBody}`);

    await hazelcastService.store(DeviceCommand.getClassName(), deviceCommand);
    eventBus.publish(commandEvent);

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new CommandInsertResponseBody({ deviceCommand: deviceCommand.toObject() }));

    debug(`Response (correlation id: ${request.correlationId}): ${response.body}`);

    return response;
};
