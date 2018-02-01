const eventBus = require(`../../eventbus/EventBus`);
const hazelcastService = require(`../../service/hazelcast/HazelcastService`);
const Response = require(`../../shim/Response`);
const CommandsUpdateRequestBody = require(`../../common/model/rpc/CommandsUpdateRequestBody`);
const DeviceCommand = require(`../../common/model/DeviceCommand`);
const CommandsUpdateEvent = require(`../../common/model/eventbus/events/CommandsUpdateEvent`);


module.exports = async (request) => {
    const commandsUpdateRequestBody = new CommandsUpdateRequestBody(request.body);
    const response = new Response();

    await hazelcastService.store(DeviceCommand.getClassName(), commandsUpdateRequestBody.deviceCommand);
    eventBus.publish(new CommandsUpdateEvent(request.body));

    response.errorCode = 0;
    response.failed = false;

    return response;
};
