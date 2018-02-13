const debug = require(`debug`)(`request-handler:plugin-subscribe`);
const Constants = require(`../../common/Constants`);
const PluginSubscribeRequestBody = require(`../../common/model/rpc/PluginSubscribeRequestBody`);
const PluginSubscribeResponseBody = require(`../../common/model/rpc/PluginSubscribeResponseBody`);
const NotificationSubscribeRequestBody = require(`../../common/model/rpc/NotificationSubscribeRequestBody`);
const notificationSubscribeRequestHandler = require(`../notification/NotificationSubscribeRequestHandler`);
const CommandSubscribeRequestBody = require(`../../common/model/rpc/CommandSubscribeRequestBody`);
const commandSubscribeRequestHandler = require(`../command/CommandSubscribeRequestHandler`);
const Request = require(`../../shim/Request`);
const Response = require(`../../shim/Response`);


/**
 * Plugin subscription request handler
 * @param request
 * @returns {Promise<void>}
 */
module.exports = async (request) => {
    const pluginSubscribeRequestBody = new PluginSubscribeRequestBody(request.body);
    const response = new Response({ last: false });

    debug(`Request (correlation id: ${request.correlationId}): ${pluginSubscribeRequestBody}`);

    if (pluginSubscribeRequestBody.returnCommands === true) {
        await createCommandSubscription(pluginSubscribeRequestBody, false, request.correlationId);
    }

    if (pluginSubscribeRequestBody.returnUpdatedCommands === true) {
        await createCommandSubscription(pluginSubscribeRequestBody, true, request.correlationId);
    }

    if (pluginSubscribeRequestBody.returnNotifications === true) {
        await createNotificationSubscription(pluginSubscribeRequestBody, request.correlationId);
    }

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new PluginSubscribeResponseBody({
        subId: pluginSubscribeRequestBody.subscriptionId
    }));

    debug(`Response (correlation id: ${request.correlationId}): ${response.body}`);

    return response;
};

/**
 * Create plugin notification subscription
 * @param pluginSubscribeRequestBody
 * @param correlationId
 * @returns {Promise}
 */
function createNotificationSubscription(pluginSubscribeRequestBody, correlationId) {
    return Promise.all(pluginSubscribeRequestBody.filters.map(filter => {
        filter.eventName = Constants.NOTIFICATION_EVENT;

        return notificationSubscribeRequestHandler(new Request({
            correlationId: correlationId,
            body: new NotificationSubscribeRequestBody({
                subscriptionId: pluginSubscribeRequestBody.subscriptionId,
                filter: filter,
                names: pluginSubscribeRequestBody.names,
            }),
            singleReplyExpected: false,
            replyTo: pluginSubscribeRequestBody.topicName
        }));
    }));
}

/**
 * Create plugin command subscription
 * @param pluginSubscribeRequestBody
 * @param returnUpdated
 * @param correlationId
 * @returns {Promise}
 */
function createCommandSubscription(pluginSubscribeRequestBody, returnUpdated, correlationId) {
    return Promise.all(pluginSubscribeRequestBody.filters.map(filter => {
        filter.eventName = Constants.COMMAND_EVENT;

        return commandSubscribeRequestHandler(new Request({
            correlationId: correlationId,
            body: new CommandSubscribeRequestBody({
                subscriptionId: pluginSubscribeRequestBody.subscriptionId,
                filter: filter,
                names: pluginSubscribeRequestBody.names,
                returnUpdated: returnUpdated,
                limit: 0
            }),
            singleReplyExpected: false,
            replyTo: pluginSubscribeRequestBody.topicName
        }));
    }));
}
