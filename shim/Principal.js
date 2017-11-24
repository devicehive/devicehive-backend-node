
class Principal {

    static get GET_NETWORK_ACTION() { return "GET_NETWORK"; };
    static get GET_DEVICE_ACTION() { return "GET_DEVICE"; };
    static get GET_DEVICE_NOTIFICATION_ACTION() { return "GET_DEVICE_NOTIFICATION"; };
    static get GET_DEVICE_COMMAND_ACTION() { return "GET_DEVICE_COMMAND"; };
    static get REGISTER_DEVICE_ACTION() { return "REGISTER_DEVICE"; };
    static get CREATE_DEVICE_NOTIFICATION_ACTION() { return "CREATE_DEVICE_NOTIFICATION"; };
    static get CREATE_DEVICE_COMMAND_ACTION() { return "CREATE_DEVICE_COMMAND"; };
    static get UPDATE_DEVICE_COMMAND_ACTION() { return "UPDATE_DEVICE_COMMAND"; };
    static get GET_CURRENT_USER_ACTION() { return "GET_CURRENT_USER"; };
    static get UPDATE_CURRENT_USER_ACTION() { return "UPDATE_CURRENT_USER"; };
    static get MANAGE_TOKEN_ACTION() { return "MANAGE_TOKEN"; };
    static get MANAGE_USER_ACTION() { return "MANAGE_USER"; };
    static get MANAGE_CONFIGURATION_ACTION() { return "MANAGE_CONFIGURATION"; };
    static get MANAGE_NETWORK_ACTION() { return "MANAGE_NETWORK"; };
    static get MANAGE_PLUGIN_ACTION() { return "MANAGE_PLUGIN"; };


    constructor({ actions, networkIds, deviceIds, allNetworksAvailable, allDevicesAvailable, user }) {
        const me = this;

        me.actions = actions;
        me.networkIds = networkIds;
        me.deviceIds = deviceIds;
        me.allNetworksAvailable = allNetworksAvailable;
        me.allDevicesAvailable = allDevicesAvailable;
        me.user = user;
    }

    get actions() {
        const me = this;

        return me._actions;
    }

    set actions(value) {
        const me = this;

        me._actions = value;
    }

    get networkIds() {
        const me = this;

        return me._networkIds;
    }

    set networkIds(value) {
        const me = this;

        me._networkIds = value;
    }

    get deviceIds() {
        const me = this;

        return me._deviceIds;
    }

    set deviceIds(value) {
        const me = this;

        me._deviceIds = value;
    }

    get allNetworksAvailable() {
        const me = this;

        return me._allNetworksAvailable;
    }

    set allNetworksAvailable(value) {
        const me = this;

        me._allNetworksAvailable = value;
    }

    get allDevicesAvailable() {
        const me = this;

        return me._allDevicesAvailable;
    }

    set allDevicesAvailable(value) {
        const me = this;

        me._allDevicesAvailable = value;
    }

    get user() {
        const me = this;

        return me._user;
    }

    set user(value) {
        const me = this;

        me._user = value;
    }

    hasAction(action) {
        const me = this;

        return me.actions.includes(action);
    }
}

module.exports = Principal;
