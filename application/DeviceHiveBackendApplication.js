const { MessageUtils, MessageBuilder } = require(`devicehive-proxy-message`);
const proxyClient = require(`../proxy/ProxyClient`);
const Request = require(`../shim/Request`);
const Response = require(`../shim/Response`);
const RequestHandlerFactory = require(`./RequestHandlerFactory`);


proxyClient.on(`open`, () => {
    proxyClient.sendMessage(MessageBuilder.createTopic({ topicList: [`request_topic`] }));
    proxyClient.sendMessage(MessageBuilder.subscribeTopic({ topicList: [`request_topic`] }));
});

proxyClient.on(`message`, async (message) => {
    if (message.type === MessageUtils.NOTIFICATION_TYPE) {
        const payload = message.payload;

        if (payload && payload.message) {
            const request = Request.normalize(JSON.parse(payload.message));
            let response;

            switch (request.type) {
                case Request.PING_TYPE:
                    response = getPongResponse(request);
                    break;
                case Request.CLIENT_REQUEST_TYPE:
                    response = await handleClientRequest(request);
                    break;
                default:
                    response = getErrorResponse(request);
                    break;
            }

            proxyClient.sendMessage(MessageBuilder.createNotification({
                topic: request.replyTo,
                message: response.toString(),
                partition: request.partitionKey
            }));
        }
    }
});


function getPongResponse(request) {
    return new Response({correlationId: request.correlationId});
}


async function handleClientRequest(request) {
    const requestHandler = RequestHandlerFactory.getHandlerByAction(request.body.action);
    let response = new Response();

    if (!requestHandler) {
        response.withErrorCode(500);
    } else {
        response = await requestHandler(request);
    }

    response.correlationId = request.correlationId;

    return response;
}


function getErrorResponse(request) {
    return (new Response({correlationId: request.correlationId}))
        .withErrorCode(404);
}


