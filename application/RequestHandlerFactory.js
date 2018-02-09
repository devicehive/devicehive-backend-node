const Action = require(`../shim/Action`);
const listDeviceHandler = require(`../messages.handler/dao/list/ListDeviceHandler`);
const listDeviceTypeHandler = require(`../messages.handler/dao/list/ListDeviceTypeHandler`);
const listNetworkHandler = require(`../messages.handler/dao/list/ListNetworkHandler`);
const listUserHandler = require(`../messages.handler/dao/list/ListUserHandler`);
const listPluginHandler = require(`../messages.handler/dao/list/ListPluginHandler`);
const countDeviceHandler = require(`../messages.handler/dao/count/CountDeviceHandler`);
const countDeviceTypeHandler = require(`../messages.handler/dao/count/CountDeviceTypeHandler`);
const countNetworkHandler = require(`../messages.handler/dao/count/CountNetworkHandler`);
const countPluginHandler = require(`../messages.handler/dao/count/CountPluginHandler`);
const countUserHandler = require(`../messages.handler/dao/count/CountUserHandler`);
const notificationSubscribeRequestHandler = require(`../messages.handler/notification/NotificationSubscribeRequestHandler`);
const notificationUnsubscribeRequestHandler = require(`../messages.handler/notification/NotificationUnsubscribeRequestHandler`);
const notificationInsertHandler = require(`../messages.handler/notification/NotificationInsertHandler`);
const notificationSearchHandler = require(`../messages.handler/notification/NotificationSearchHandler`);
const commandInsertHandler = require(`../messages.handler/command/CommandInsertHandler`);
const commandSearchHandler = require(`../messages.handler/command/CommandSearchHandler`);
const commandSubscribeRequestHandler = require(`../messages.handler/command/CommandSubscribeRequestHandler`);
const commandsUpdateHandler = require(`../messages.handler/command/CommandsUpdateHandler`);
const commandUnsubscribeRequestHandler = require(`../messages.handler/command/CommandUnsubscribeRequestHandler`);
const commandUpdateHandler = require(`../messages.handler/command/CommandUpdateHandler`);
const commandUpdateSubscribeRequestHandler = require(`../messages.handler/command/CommandUpdateSubscribeRequestHandler`);
const pluginSubscribeRequestHandler = require(`../messages.handler/plugin/PluginSubscribeRequestHandler`);
const pluginUnsubscribeRequestHandler = require(`../messages.handler/plugin/PluginUnsubscribeRequestHandler`);
const deviceDeleteHandler = require(`../messages.handler/DeviceDeleteHandler`);

const actionToHandlerMap = new Map();

actionToHandlerMap.set(Action.NOTIFICATION_SEARCH_REQUEST, notificationSearchHandler);
actionToHandlerMap.set(Action.NOTIFICATION_INSERT_REQUEST, notificationInsertHandler);
actionToHandlerMap.set(Action.NOTIFICATION_SUBSCRIBE_REQUEST, notificationSubscribeRequestHandler);
actionToHandlerMap.set(Action.NOTIFICATION_UNSUBSCRIBE_REQUEST, notificationUnsubscribeRequestHandler);
actionToHandlerMap.set(Action.COMMAND_SEARCH_REQUEST, commandSearchHandler);
actionToHandlerMap.set(Action.COMMAND_INSERT_REQUEST, commandInsertHandler);
actionToHandlerMap.set(Action.COMMAND_UPDATE_REQUEST, commandUpdateHandler);
actionToHandlerMap.set(Action.COMMANDS_UPDATE_REQUEST, commandsUpdateHandler);
actionToHandlerMap.set(Action.COMMAND_SUBSCRIBE_REQUEST, commandSubscribeRequestHandler);
actionToHandlerMap.set(Action.COMMAND_UNSUBSCRIBE_REQUEST, commandUnsubscribeRequestHandler);
actionToHandlerMap.set(Action.COMMAND_UPDATE_SUBSCRIBE_REQUEST, commandUpdateSubscribeRequestHandler);
actionToHandlerMap.set(Action.PLUGIN_SUBSCRIBE_REQUEST, pluginSubscribeRequestHandler);
actionToHandlerMap.set(Action.PLUGIN_UNSUBSCRIBE_REQUEST, pluginUnsubscribeRequestHandler);
actionToHandlerMap.set(Action.LIST_USER_REQUEST, listUserHandler);
actionToHandlerMap.set(Action.LIST_NETWORK_REQUEST, listNetworkHandler);
actionToHandlerMap.set(Action.LIST_DEVICE_TYPE_REQUEST, listDeviceTypeHandler);
actionToHandlerMap.set(Action.LIST_DEVICE_REQUEST, listDeviceHandler);
actionToHandlerMap.set(Action.DEVICE_DELETE_REQUEST, deviceDeleteHandler);
actionToHandlerMap.set(Action.LIST_PLUGIN_REQUEST, listPluginHandler);
actionToHandlerMap.set(Action.COUNT_DEVICE_REQUEST, countDeviceHandler);
actionToHandlerMap.set(Action.COUNT_DEVICE_TYPE_REQUEST, countDeviceTypeHandler);
actionToHandlerMap.set(Action.COUNT_NETWORK_REQUEST, countNetworkHandler);
actionToHandlerMap.set(Action.COUNT_PLUGIN_REQUEST, countPluginHandler);
actionToHandlerMap.set(Action.COUNT_USER_REQUEST, countUserHandler);


/**
 * Request handler class
 */
class RequestHandlerFactory {

    /**
     * Returns request handler by request action
     * @param action
     * @returns {Function}
     */
    static getHandlerByAction(action) {
        return actionToHandlerMap.get(action);
    }
}


module.exports = RequestHandlerFactory;
