const proxyClient = require(`../proxy/ProxyClient.js`);
const ProxyMessageBuilder = require(`../proxy/ProxyMessageBuilder.js`);
const Request = require(`../shim/Request.js`);
const Response = require(`../shim/Response.js`);
const RequestHandlerFactory = require(`./RequestHandlerFactory.js`);


proxyClient.on(`open`, () => {
    proxyClient.send(ProxyMessageBuilder.createTopic({topics: [`request_topic`]}).toString());
    proxyClient.send(ProxyMessageBuilder.subscribeTopic({
        topics: [`request_topic`],
        consumerGroup: `request-consumer-group`
    }).toString());
});

proxyClient.on(`notification`, async (payload) => {
    const request = Request.normalize(payload);
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

    proxyClient.send(ProxyMessageBuilder.createNotification({
        topic: request.replyTo,
        message: response.toString(),
        partition: request.partitionKey
    }).toString());
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


