const eventBus = require(`../../eventbus/EventBus`);
const CommandUnsubscribeRequestBody = require(`../../common/model/rpc/CommandUnsubscribeRequestBody`);
const CommandUnsubscribeResponseBody = require(`../../common/model/rpc/CommandUnsubscribeResponseBody`);
const Subscriber = require(`../../common/model/eventbus/Subscriber`);
const Response = require(`../../shim/Response`);


module.exports = async (request) => {
    const commandUnsubscribeRequestBody = new CommandUnsubscribeRequestBody(request.body);
    const response = new Response();

    commandUnsubscribeRequestBody.subscriptionIds.forEach((subscriptionId) => {
        eventBus.unsubscribe(new Subscriber({
            id: subscriptionId,
            replyTo: request.replyTo,
            correlationId: request.correlationId
        }));
    });

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new CommandUnsubscribeResponseBody({
        subscriptionIds: commandUnsubscribeRequestBody.subscriptionIds
    }));

    return response;
};
