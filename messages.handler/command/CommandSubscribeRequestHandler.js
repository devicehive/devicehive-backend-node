const debug = require(`debug`)(`request-handler:command-subscribe`);
const eventBus = require(`../../eventbus/EventBus`);
const hazelcastService = require(`../../service/hazelcast/HazelcastService`);
const CommandSubscribeRequestBody = require(`../../common/model/rpc/CommandSubscribeRequestBody`);
const CommandSubscribeResponseBody = require(`../../common/model/rpc/CommandSubscribeResponseBody`);
const Subscriber = require(`../../common/model/eventbus/Subscriber`);
const DeviceCommand = require(`../../common/model/DeviceCommand`);
const Response = require(`../../shim/Response`);


/**
 * Command subscription request handler
 * @param request
 * @returns {Promise<void>}
 */
module.exports = async (request) => {
    const commandSubscribeRequestBody = new CommandSubscribeRequestBody(request.body);
    const response = new Response({ last: false });

    debug(`Request (correlation id: ${request.correlationId}): ${commandSubscribeRequestBody}`);

    if (commandSubscribeRequestBody.returnUpdated === true) {
        commandSubscribeRequestBody.filter.eventName = `COMMANDS_UPDATE_EVENT`; // TODO
    }

    eventBus.subscribe(
        commandSubscribeRequestBody.filter,
        new Subscriber({
            id: commandSubscribeRequestBody.subscriptionId,
            replyTo: request.replyTo,
            correlationId: request.correlationId
        }));

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new CommandSubscribeResponseBody({
        subId: commandSubscribeRequestBody.subscriptionId,
        commands: await findCommands(
            commandSubscribeRequestBody.filter,
            commandSubscribeRequestBody.names,
            commandSubscribeRequestBody.timestamp,
            commandSubscribeRequestBody.returnUpdated,
            commandSubscribeRequestBody.limit)
    }));

    debug(`Response (correlation id: ${request.correlationId}): ${response.body}`);

    return response;
};

/**
 * Find commands which correspond to the subscription
 * @param filter
 * @param names
 * @param timestamp
 * @param returnUpdated
 * @param limit
 * @returns {Promise<Array>}
 */
async function findCommands(filter, names, timestamp, returnUpdated, limit) {
    let commands = [];

    if (timestamp) {
        commands = (await hazelcastService.find(DeviceCommand.getClassName(), {
            deviceIds: [ filter.deviceId ],
            networkIds: [ filter.networkId ],
            deviceTypeIds: [ filter.deviceTypeId ],
            names: names,
            from: timestamp,
            returnUpdated: returnUpdated,
            status: null,
            limit: limit
        })).map((deviceCommand) => deviceCommand.toObject());
    }

    return commands;
}
