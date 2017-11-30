const eventBus = require(`../../eventbus/EventBus.js`);
const NotificationUnsubscribeRequestBody = require(`../../common/model/rpc/NotificationUnsubscribeRequestBody.js`);
const NotificationUnsubscribeResponseBody = require(`../../common/model/rpc/NotificationUnsubscribeResponseBody.js`);
const Subscriber = require(`../../common/model/eventbus/Subscriber.js`);
const Response = require(`../../shim/Response.js`);


module.exports = async (request) => {
    const notificationUnsubscribeRequestBody = new NotificationUnsubscribeRequestBody(request.body);
    const response = new Response({ last: false });

    notificationUnsubscribeRequestBody.subscriptionIds.forEach((subscriptionId) => {
        eventBus.unsubscribe(new Subscriber({
            id: subscriptionId,
            replyTo: request.replyTo,
            correlationId: request.correlationId
        }));
    });

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new NotificationUnsubscribeResponseBody({
        subscriptionIds: notificationUnsubscribeRequestBody.subscriptionIds
    }));

    return response;
};
