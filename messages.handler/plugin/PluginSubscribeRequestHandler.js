const PluginSubscribeRequestBody = require(`../../common/model/rpc/PluginSubscribeRequestBody`);
const PluginSubscribeResponseBody = require(`../../common/model/rpc/PluginSubscribeResponseBody`);
const NotificationSubscribeRequestBody = require(`../../common/model/rpc/NotificationSubscribeRequestBody`);
const PluginSubscribeResponseBody = require(`../../common/model/rpc/PluginSubscribeResponseBody`);
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

            const notificationSubscribeRequestBody = new NotificationSubscribeRequestBody({
                subscriptionId: pluginSubscribeRequestBody.subscriptionId,
                filter: filter,
                names: pluginSubscribeRequestBody.names,
            });

            // notificationRequest = Request.newBuilder()
            //     .withBody(notificationSubscribeRequestBody)
            //     .withSingleReply(false)
            //     .build();
            // notificationRequest.setReplyTo(pluginSubscribeRequestBody.getTopicName());
            // return notificationSubscribeRequestHandler.handle(notificationRequest);
        });
}

function createCommandSubscription(pluginSubscribeRequestBody, returnUpdated) {

    pluginSubscribeRequestBody.filters
        .forEach((filter) => {
            filter.eventName = `COMMAND_EVENT`; //TODO

            // CommandSubscribeRequest commandSubscribeRequest = new CommandSubscribeRequest(pluginSubscribeRequestBody.getSubscriptionId(),
            //     filter, pluginSubscribeRequestBody.getNames(), null, returnUpdated, 0);
            //
            // Request commandRequest = Request.newBuilder()
            //     .withBody(commandSubscribeRequest)
            //     .withSingleReply(false)
            //     .build();
            // commandRequest.setReplyTo(pluginSubscribeRequestBody.getTopicName());
            // return commandSubscribeRequestHandler.handle(commandRequest);
        });
}
