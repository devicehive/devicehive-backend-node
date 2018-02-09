const debug = require(`debug`)(`request-handler:command-update-subscribe`);
const eventBus = require(`../../eventbus/EventBus`);
const hazelcastService = require(`../../service/hazelcast/HazelcastService`);
const CommandUpdateSubscribeRequestBody = require(`../../common/model/rpc/CommandUpdateSubscribeRequestBody`);
const CommandUpdateSubscribeResponseBody = require(`../../common/model/rpc/CommandUpdateSubscribeResponseBody`);
const Subscriber = require(`../../common/model/eventbus/Subscriber`);
const DeviceCommand = require(`../../common/model/DeviceCommand`);
const Response = require(`../../shim/Response`);


/**
 * Command update subscription request handler
 * @param request
 * @returns {Promise<void>}
 */
module.exports = async (request) => {
    const commandUpdateSubscribeRequestBody = new CommandUpdateSubscribeRequestBody(request.body);
    const response = new Response({ last: false });

    debug(`Request (correlation id: ${request.correlationId}): ${commandUpdateSubscribeRequestBody}`);

    eventBus.subscribe(
        commandUpdateSubscribeRequestBody.filter,
        new Subscriber({
            id: commandUpdateSubscribeRequestBody.subscriptionId,
            replyTo: request.replyTo,
            correlationId: request.correlationId
        }));

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new CommandUpdateSubscribeResponseBody({
        subscriptionId: commandUpdateSubscribeRequestBody.subscriptionId,
        deviceCommand: await findCommand(
            commandUpdateSubscribeRequestBody.commandId,
            commandUpdateSubscribeRequestBody.deviceId
        )
    }));

    debug(`Response (correlation id: ${request.correlationId}): ${response.body}`);

    return response;
};

/**
 * Find command which corresponds to the subscription
 * @param id
 * @param deviceId
 * @returns {Promise<*>}
 */
async function findCommand(id, deviceId) {
    const deviceCommand = await hazelcastService.find(DeviceCommand.getClassName(), {
        id: id,
        deviceIds: [ deviceId ]
    });

    return deviceCommand[0] ? deviceCommand[0].toObject() : deviceCommand[0];
}
