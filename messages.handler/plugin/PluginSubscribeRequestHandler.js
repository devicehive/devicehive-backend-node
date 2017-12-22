const PluginSubscribeRequestBody = require(`../../common/model/rpc/PluginSubscribeRequestBody`);
const PluginSubscribeResponseBody = require(`../../common/model/rpc/PluginSubscribeResponseBody`);
const NotificationSubscribeRequestBody = require(`../../common/model/rpc/NotificationSubscribeRequestBody`);
const notificationSubscribeRequestHandler = require(`../notification/NotificationSubscribeRequestHandler`);
const CommandSubscribeRequestBody = require(`../../common/model/rpc/CommandSubscribeRequestBody`);
const commandSubscribeRequestHandler = require(`../command/CommandSubscribeRequestHandler`);
const Request = require(`../../shim/Request`);
const Response = require(`../../shim/Response`);


module.exports = async (request) => {
    const pluginSubscribeRequestBody = new PluginSubscribeRequestBody(request.body);
    const response = new Response({ last: false });

    if (pluginSubscribeRequestBody.returnCommands === true) {
        createCommandSubscription(pluginSubscribeRequestBody, false);
    }

    if (pluginSubscribeRequestBody.returnUpdatedCommands === true) {
        createCommandSubscription(pluginSubscribeRequestBody, true);
    }

    if (pluginSubscribeRequestBody.returnNotifications === true) {
        createNotificationSubscription(pluginSubscribeRequestBody);
    }

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new PluginSubscribeResponseBody({
        subId: pluginSubscribeRequestBody.subscriptionId
    }));

    return response;
};


function createNotificationSubscription(pluginSubscribeRequestBody) {

    pluginSubscribeRequestBody.filters
        .forEach((filter) => {
            filter.eventName = `NOTIFICATION_EVENT`; //TODO

            notificationSubscribeRequestHandler(new Request({
                body: new NotificationSubscribeRequestBody({
                    subscriptionId: pluginSubscribeRequestBody.subscriptionId,
                    filter: filter,
                    names: pluginSubscribeRequestBody.names,
                }),
                singleReplyExpected: false,
                replyTo: pluginSubscribeRequestBody.topicName
            }));
        });
}


function createCommandSubscription(pluginSubscribeRequestBody, returnUpdated) {

    pluginSubscribeRequestBody.filters
        .forEach((filter) => {
            filter.eventName = `COMMAND_EVENT`; //TODO

            commandSubscribeRequestHandler(new Request({
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
        });
}
