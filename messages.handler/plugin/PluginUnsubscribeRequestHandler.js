const debug = require(`debug`)(`request-handler:plugin-unsubscribe`);
const PluginUnsubscribeRequestBody = require(`../../common/model/rpc/PluginUnsubscribeRequestBody`);
const PluginUnsubscribeResponseBody = require(`../../common/model/rpc/PluginUnsubscribeResponseBody`);
const NotificationUnsubscribeRequestBody = require(`../../common/model/rpc/NotificationUnsubscribeRequestBody`);
const notificationUnsubscribeRequestHandler = require(`../notification/NotificationUnsubscribeRequestHandler`);
const CommandUnsubscribeRequestBody = require(`../../common/model/rpc/CommandUnsubscribeRequestBody`);
const commandUnsubscribeRequestHandler = require(`../command/CommandUnsubscribeRequestHandler`);
const Request = require(`../../shim/Request`);
const Response = require(`../../shim/Response`);


/**
 * Plugin unsubscribe request handler
 * @param request
 * @returns {Promise<void>}
 */
module.exports = async (request) => {
    const pluginUnsubscribeRequestBody = new PluginUnsubscribeRequestBody(request.body);
    const response = new Response({last: false});

    debug(`Request (correlation id: ${request.correlationId}): ${pluginUnsubscribeRequestBody}`);

    await removeCommandSubscription(pluginUnsubscribeRequestBody, request.correlationId);
    await removeNotificationSubscription(pluginUnsubscribeRequestBody, request.correlationId);

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new PluginUnsubscribeResponseBody({
        subId: pluginUnsubscribeRequestBody.subscriptionId
    }));

    debug(`Response (correlation id: ${request.correlationId}): ${response.body}`);

    return response;
};

/**
 * Remove plugin notification subscription
 * @param pluginSubscribeRequestBody
 * @param correlationId
 * @returns {Promise<*>|Response}
 */
function removeNotificationSubscription(pluginSubscribeRequestBody, correlationId) {
    return notificationUnsubscribeRequestHandler(new Request({ //TODO
        correlationId: correlationId,
        body: new NotificationUnsubscribeRequestBody({
            subscriptionIds: [pluginSubscribeRequestBody.subscriptionId]
        }),
        singleReplyExpected: false,
        replyTo: pluginSubscribeRequestBody.topicName
    }));
}

/**
 * Remove plugin command subscription
 * @param pluginSubscribeRequestBody
 * @param correlationId
 * @returns {Promise<*>|Response}
 */
function removeCommandSubscription(pluginSubscribeRequestBody, correlationId) {
    return commandUnsubscribeRequestHandler(new Request({ //TODO
        correlationId: correlationId,
        body: new CommandUnsubscribeRequestBody({
            subscriptionIds: [pluginSubscribeRequestBody.subscriptionId]
        }),
        singleReplyExpected: false,
        replyTo: pluginSubscribeRequestBody.topicName
    }));
}
