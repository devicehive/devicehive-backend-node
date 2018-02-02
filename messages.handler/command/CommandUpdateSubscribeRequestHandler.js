const eventBus = require(`../../eventbus/EventBus`);
const hazelcastService = require(`../../service/hazelcast/HazelcastService`);
const CommandUpdateSubscribeRequestBody = require(`../../common/model/rpc/CommandUpdateSubscribeRequestBody`);
const CommandUpdateSubscribeResponseBody = require(`../../common/model/rpc/CommandUpdateSubscribeResponseBody`);
const Subscriber = require(`../../common/model/eventbus/Subscriber`);
const DeviceCommand = require(`../../common/model/DeviceCommand`);
const Response = require(`../../shim/Response`);


module.exports = async (request) => {
    const commandUpdateSubscribeRequestBody = new CommandUpdateSubscribeRequestBody(request.body);
    const response = new Response({ last: false });

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

    return response;
};

async function findCommand(id, deviceId) {
    const deviceCommand = await hazelcastService.find(DeviceCommand.getClassName(), {
        id: id,
        deviceIds: [ deviceId ]
    });

    return deviceCommand[0] ? deviceCommand[0].toObject() : deviceCommand[0];
}
