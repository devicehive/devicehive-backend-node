const PluginUnsubscribeRequestBody = require(`../../common/model/rpc/PluginUnsubscribeRequestBody`);
const PluginUnsubscribeResponseBody = require(`../../common/model/rpc/PluginUnsubscribeResponseBody`);
const NotificationUnsubscribeRequestBody = require(`../../common/model/rpc/NotificationUnsubscribeRequestBody`);
const notificationUnsubscribeRequestHandler = require(`../notification/NotificationUnsubscribeRequestHandler`);
const CommandUnsubscribeRequestBody = require(`../../common/model/rpc/CommandUnsubscribeRequestBody`);
const commandUnsubscribeRequestHandler = require(`../command/CommandUnsubscribeRequestHandler`);
const Request = require(`../../shim/Request`);
const Response = require(`../../shim/Response`);


module.exports = async (request) => {
    const pluginUnsubscribeRequestBody = new PluginUnsubscribeRequestBody(request.body);
    const response = new Response({last: false});

    removeCommandSubscription(pluginUnsubscribeRequestBody);
    removeNotificationSubscription(pluginUnsubscribeRequestBody);

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new PluginUnsubscribeResponseBody({
        subId: pluginUnsubscribeRequestBody.subscriptionId
    }));

    return response;
};


function removeNotificationSubscription(pluginSubscribeRequestBody) {
    notificationUnsubscribeRequestHandler(new Request({ //TODO
        body: new NotificationUnsubscribeRequestBody({
            subscriptionIds: [pluginSubscribeRequestBody.subscriptionId]
        }),
        singleReplyExpected: false,
        replyTo: pluginSubscribeRequestBody.topicName
    }));
}


function removeCommandSubscription(pluginSubscribeRequestBody) {
    commandUnsubscribeRequestHandler(new Request({ //TODO
        body: new CommandUnsubscribeRequestBody({
            subscriptionIds: [pluginSubscribeRequestBody.subscriptionId]
        }),
        singleReplyExpected: false,
        replyTo: pluginSubscribeRequestBody.topicName
    }));
}
