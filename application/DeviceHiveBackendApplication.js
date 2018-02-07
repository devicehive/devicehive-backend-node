const CONFIG = require(`../config`).backend;
const logger = require(`../logger/ApplicationLogger`).init(`DH BACKEND`, CONFIG.LOGGER_LEVEL);
const { MessageUtils, MessageBuilder } = require(`devicehive-proxy-message`);
const proxyClient = require(`../proxy/ProxyClient`);
const Request = require(`../shim/Request`);
const Response = require(`../shim/Response`);
const RequestHandlerFactory = require(`./RequestHandlerFactory`);
const ErrorResponseBody = require(`../common/model/rpc/ErrorResponseBody`);


proxyClient.on(`open`, () => {
    logger.info(`ProxyClient has been started`);

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
                    logger.info(`Received PING message`);

                    response = getPongResponse(request);
                    break;
                case Request.CLIENT_REQUEST_TYPE:
                    response = await handleClientRequest(request);
                    break;
                default:
                    logger.warn(`Unknown request type: ${request.type}`);

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


/**
 *
 * @param request
 * @returns {Promise<void>}
 */
async function handleClientRequest(request) {
    const requestHandler = RequestHandlerFactory.getHandlerByAction(request.body.action);
    let response = new Response();

    if (!requestHandler) {
        logger.warn(`No corresponding request handler for request #${request.body.action}`);

        response = getErrorResponse(request, 500, `No corresponding request handler`); //TODO error
    } else {
        try {
            response = await requestHandler(request);
        } catch (error) {
            logger.error(`Error while handling client request action #${request.body.action} (correlation id: ${request.correlationId}): ${error.message}`);

            response = getErrorResponse(request, 500, error.message)
        }
    }

    response.correlationId = request.correlationId;

    return response;
}


/**
 *
 * @param request
 */
function getPongResponse(request) {
    return new Response({correlationId: request.correlationId});
}


/**
 *
 * @param request
 * @param code
 * @param message
 * @returns {*}
 */
function getErrorResponse(request, code, message) {
    return (new Response({
        correlationId: request.correlationId,
        failed: true
    }))
        .withErrorCode(code)
        .withBody(new ErrorResponseBody({message}));
}


