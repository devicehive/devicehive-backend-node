const eventBus = require(`../../eventbus/EventBus`);
const hazelcastService = require(`../../service/hazelcast/HazelcastService`);
const Response = require(`../../shim/Response`);
const CommandUpdateRequestBody = require(`../../common/model/rpc/CommandUpdateRequestBody`);
const DeviceCommand = require(`../../common/model/DeviceCommand`);
const CommandUpdateEvent = require(`../../common/model/eventbus/events/CommandUpdateEvent`);


module.exports = async (request) => {
    const commandUpdateRequestBody = new CommandUpdateRequestBody(request.body);
    const response = new Response();

    await hazelcastService.store(DeviceCommand.getClassName(), commandUpdateRequestBody.deviceCommand);
    eventBus.publish(new CommandUpdateEvent(request.body));

    response.errorCode = 0;
    response.failed = false;

    return response;
};
