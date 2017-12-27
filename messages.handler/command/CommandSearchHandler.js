const hazelcastService = require(`../../service/hazelcast/HazelcastService`);
const CommandSearchRequestBody = require(`../../common/model/rpc/CommandSearchRequestBody`);
const CommandSearchResponseBody = require(`../../common/model/rpc/CommandSearchResponseBody`);
const DeviceCommand = require(`../../common/model/DeviceCommand`);
const Response = require(`../../shim/Response`);


module.exports = async (request) => {
    const commandSearchRequestBody = new CommandSearchRequestBody(request.body);
    const response = new Response({ last: false });
    const commands = commandSearchRequestBody.id && commandSearchRequestBody.deviceId ?
        await searchSingleCommandByDeviceAndId(commandSearchRequestBody.id, commandSearchRequestBody.deviceId) :
        await searchMultipleCommands(commandSearchRequestBody);

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new CommandSearchResponseBody({
        commands: commands
    }));

    return response;
};


async function searchMultipleCommands(commandSearchRequestBody) {
    const commands = await hazelcastService.find(DeviceCommand.getClassName(), {
        deviceIds: commandSearchRequestBody.deviceIds,
        names: commandSearchRequestBody.names,
        limit: (commandSearchRequestBody.take || 0) - (commandSearchRequestBody.skip || 0),
        from: commandSearchRequestBody.start,
        to: commandSearchRequestBody.end,
        returnUpdated: false,
        status: null
    });

    return commands.map((deviceCommand) => deviceCommand.toObject());
}


async function searchSingleCommandByDeviceAndId(id, deviceId) {
    return (await hazelcastService.find(DeviceCommand.getClassName(), { id: id, deviceIds: [ deviceId ] }))
        .map((deviceCommand) => deviceCommand.toObject());
}
