/**
 * DeviceHive Action class
 */
class Action {
    static get EMPTY() { return 0; }
    static get ERROR_RESPONSE() { return 1; }

    static get NOTIFICATION_SEARCH_REQUEST() { return 2; }
    static get NOTIFICATION_SEARCH_RESPONSE() { return 3; }
    static get NOTIFICATION_INSERT_REQUEST() { return 4; }
    static get NOTIFICATION_INSERT_RESPONSE() { return 5; }
    static get NOTIFICATION_SUBSCRIBE_REQUEST() { return 6; }
    static get NOTIFICATION_SUBSCRIBE_RESPONSE() { return 7; }
    static get NOTIFICATION_UNSUBSCRIBE_REQUEST() { return 8; }
    static get NOTIFICATION_UNSUBSCRIBE_RESPONSE() { return 9; }
    static get NOTIFICATION_EVENT() { return 10; }

    static get COMMAND_SEARCH_REQUEST() { return 11; }
    static get COMMAND_SEARCH_RESPONSE() { return 12; }
    static get COMMAND_INSERT_REQUEST() { return 13; }
    static get COMMAND_INSERT_RESPONSE() { return 14; }
    static get COMMAND_UPDATE_REQUEST() { return 15; }
    static get COMMANDS_UPDATE_REQUEST() { return 16; }
    static get COMMAND_SUBSCRIBE_REQUEST() { return 17; }
    static get COMMAND_SUBSCRIBE_RESPONSE() { return 18; }
    static get COMMAND_UNSUBSCRIBE_REQUEST() { return 19; }
    static get COMMAND_UNSUBSCRIBE_RESPONSE() { return 20; }
    static get COMMAND_EVENT() { return 21; }
    static get COMMAND_UPDATE_EVENT() { return 22; }
    static get COMMANDS_UPDATE_EVENT() { return 23; }
    static get COMMAND_UPDATE_SUBSCRIBE_REQUEST() { return 24; }
    static get COMMAND_UPDATE_SUBSCRIBE_RESPONSE() { return 25; }

    static get PLUGIN_SUBSCRIBE_REQUEST() { return 26; }
    static get PLUGIN_SUBSCRIBE_RESPONSE() { return 27; }
    static get PLUGIN_UNSUBSCRIBE_REQUEST() { return 28; }
    static get PLUGIN_UNSUBSCRIBE_RESPONSE() { return 29; }

    static get LIST_USER_REQUEST() { return 30; }
    static get LIST_USER_RESPONSE() { return 31; }
    static get COUNT_USER_REQUEST() { return 32; }

    static get LIST_NETWORK_REQUEST() { return 33; }
    static get LIST_NETWORK_RESPONSE() { return 34; }
    static get COUNT_NETWORK_REQUEST() { return 35; }

    static get LIST_DEVICE_TYPE_REQUEST() { return 36; }
    static get LIST_DEVICE_TYPE_RESPONSE() { return 37; }
    static get COUNT_DEVICE_TYPE_REQUEST() { return 38; }

    static get LIST_DEVICE_REQUEST() { return 39; }
    static get LIST_DEVICE_RESPONSE() { return 40; }
    static get COUNT_DEVICE_REQUEST() { return 41; }

    static get LIST_PLUGIN_REQUEST() { return 42; }
    static get LIST_PLUGIN_RESPONSE() { return 43; }
    static get COUNT_PLUGIN_REQUEST() { return 44; }

    static get DEVICE_DELETE_REQUEST() { return 45; }
    static get DEVICE_DELETE_RESPONSE() { return 46; }

    static get COUNT_RESPONSE() { return 47; }
}


module.exports = Action;
