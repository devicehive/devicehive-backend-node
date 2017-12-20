const Action = require(`../shim/Action.js`);
const Response = require(`../shim/Response.js`);
const listDeviceHandler = require(`../messages.handler/dao.list/ListDeviceHandler.js`);
const listDeviceTypeHandler = require(`../messages.handler/dao.list/listDeviceTypeHandler.js`);
const listNetworkHandler = require(`../messages.handler/dao.list/ListNetworkHandler.js`);
const listUserHandler = require(`../messages.handler/dao.list/ListUserHandler.js`);
const notificationSubscribeRequestHandler = require(`../messages.handler/notification/NotificationSubscribeRequestHandler.js`);
const notificationUnsubscribeRequestHandler = require(`../messages.handler/notification/NotificationUnsubscribeRequestHandler.js`);
const notificationInsertHandler = require(`../messages.handler/notification/NotificationInsertHandler.js`);
const notificationSearchHandler = require(`../messages.handler/notification/NotificationSearchHandler.js`);

const actionToHandlerMap = new Map();

actionToHandlerMap.set(Action.NOTIFICATION_SEARCH_REQUEST, notificationSearchHandler);
actionToHandlerMap.set(Action.NOTIFICATION_INSERT_REQUEST, notificationInsertHandler);
actionToHandlerMap.set(Action.NOTIFICATION_SUBSCRIBE_REQUEST, notificationSubscribeRequestHandler);
actionToHandlerMap.set(Action.NOTIFICATION_UNSUBSCRIBE_REQUEST, notificationUnsubscribeRequestHandler);
actionToHandlerMap.set(Action.COMMAND_SEARCH_REQUEST, () => new Response()); // TODO
actionToHandlerMap.set(Action.COMMAND_INSERT_REQUEST, () => new Response()); // TODO
actionToHandlerMap.set(Action.COMMAND_UPDATE_REQUEST, () => new Response()); // TODO
actionToHandlerMap.set(Action.COMMANDS_UPDATE_REQUEST, () => new Response()); // TODO
actionToHandlerMap.set(Action.COMMAND_SUBSCRIBE_REQUEST, () => new Response()); // TODO
actionToHandlerMap.set(Action.COMMAND_UNSUBSCRIBE_REQUEST, () => new Response()); // TODO
actionToHandlerMap.set(Action.COMMAND_UPDATE_SUBSCRIBE_REQUEST, () => new Response()); // TODO
actionToHandlerMap.set(Action.COMMAND_GET_SUBSCRIPTION_REQUEST, () => new Response()); // TODO
actionToHandlerMap.set(Action.PLUGIN_SUBSCRIBE_REQUEST, () => new Response()); // TODO
actionToHandlerMap.set(Action.PLUGIN_UNSUBSCRIBE_REQUEST, () => new Response()); // TODO
actionToHandlerMap.set(Action.LIST_USER_REQUEST, listUserHandler);
actionToHandlerMap.set(Action.LIST_NETWORK_REQUEST, listNetworkHandler);
actionToHandlerMap.set(Action.LIST_DEVICE_TYPE_REQUEST, listDeviceTypeHandler);
actionToHandlerMap.set(Action.LIST_DEVICE_REQUEST, listDeviceHandler);
actionToHandlerMap.set(Action.LIST_SUBSCRIBE_REQUEST, () => new Response()); // TODO
actionToHandlerMap.set(Action.DEVICE_DELETE_REQUEST, () => new Response()); // TODO
actionToHandlerMap.set(Action.DEVICE_CREATE_REQUEST, () => new Response()); // TODO


class RequestHandlerFactory {
    static getHandlerByAction(action) {
        return actionToHandlerMap.get(action);
    }
}

module.exports = RequestHandlerFactory;
