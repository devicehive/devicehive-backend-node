const debug = require(`debug`)(`request-handler:command-search`);
const hazelcastService = require(`../../service/hazelcast/HazelcastService`);
const CommandSearchRequestBody = require(`../../common/model/rpc/CommandSearchRequestBody`);
const CommandSearchResponseBody = require(`../../common/model/rpc/CommandSearchResponseBody`);
const DeviceCommand = require(`../../common/model/DeviceCommand`);
const Response = require(`../../shim/Response`);


/**
 * Command search request handler
 * @param request
 * @returns {Promise<void>}
 */
module.exports = async (request) => {
    const commandSearchRequestBody = new CommandSearchRequestBody(request.body);
    const response = new Response();

    debug(`Request (correlation id: ${request.correlationId}): ${commandSearchRequestBody}`);

    const commands = commandSearchRequestBody.id && commandSearchRequestBody.deviceId ?
        await searchSingleCommandByDeviceAndId(
            commandSearchRequestBody.id,
            commandSearchRequestBody.deviceId,
            commandSearchRequestBody.returnUpdated) :
        await searchMultipleCommands(commandSearchRequestBody);

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new CommandSearchResponseBody({
        commands: commands
    }));

    debug(`Response (correlation id: ${request.correlationId}): ${response.body}`);

    return response;
};

/**
 * Search multiple commands by predicates
 * @param commandSearchRequestBody
 * @returns {Promise<void>}
 */
async function searchMultipleCommands(commandSearchRequestBody) {
    const commands = await hazelcastService.find(DeviceCommand.getClassName(), {
        deviceIds: commandSearchRequestBody.deviceIds,
        names: commandSearchRequestBody.names,
        limit: (commandSearchRequestBody.take || 0) - (commandSearchRequestBody.skip || 0),
        from: commandSearchRequestBody.start,
        to: commandSearchRequestBody.end,
        returnUpdated: commandSearchRequestBody.returnUpdated,
        status: commandSearchRequestBody.status
    });

    return commands.map((deviceCommand) => deviceCommand.toObject());
}

/**
 * Search one command by id and deviceId
 * @param id
 * @param deviceId
 * @param returnUpdated
 * @returns {Promise<Array>}
 */
async function searchSingleCommandByDeviceAndId(id, deviceId, returnUpdated) {
    const commands = await hazelcastService.find(DeviceCommand.getClassName(), {
        id: id,
        deviceIds: [ deviceId ],
        returnUpdated: returnUpdated
    });

    return commands.map((deviceCommand) => deviceCommand.toObject());
}
