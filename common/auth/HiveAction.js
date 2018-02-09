const Constants = require(`../Constants`);


/**
 *
 */
class HiveAction {

    static get ANY() { return { value: 0, name: Constants.ANY }; }
    static get NONE() { return { value: 1, name: `` }; }
    static get GET_NETWORK() { return { value: 2, name: Constants.GET_NETWORK }; }
    static get GET_DEVICE() { return { value: 3, name: Constants.GET_DEVICE }; }
    static get GET_DEVICE_NOTIFICATION() { return { value: 4, name: Constants.GET_DEVICE_NOTIFICATION }; }
    static get GET_DEVICE_COMMAND() { return { value: 5, name: Constants.GET_DEVICE_COMMAND }; }
    static get REGISTER_DEVICE() { return { value: 6, name: Constants.REGISTER_DEVICE }; }
    static get CREATE_DEVICE_COMMAND() { return { value: 7, name: Constants.CREATE_DEVICE_COMMAND }; }
    static get UPDATE_DEVICE_COMMAND() { return { value: 8, name: Constants.UPDATE_DEVICE_COMMAND }; }
    static get CREATE_DEVICE_NOTIFICATION() { return { value: 9, name: Constants.CREATE_DEVICE_NOTIFICATION }; }

    static get GET_CURRENT_USER() { return { value: 10, name: Constants.GET_CURRENT_USER }; }
    static get UPDATE_CURRENT_USER() { return { value: 11, name: Constants.UPDATE_CURRENT_USER }; }

    static get MANAGE_USER() { return { value: 12, name: Constants.MANAGE_USER }; }
    static get MANAGE_CONFIGURATION() { return { value: 13, name: Constants.MANAGE_CONFIGURATION }; }
    static get MANAGE_NETWORK() { return { value: 14, name: Constants.MANAGE_NETWORK }; }
    static get MANAGE_TOKEN() { return { value: 15, name: Constants.MANAGE_TOKEN }; }
    static get MANAGE_PLUGIN() { return { value: 16, name: Constants.MANAGE_PLUGIN }; }

    static get GET_DEVICE_TYPE() { return { value: 17, name: Constants.GET_DEVICE_TYPE }; }
    static get MANAGE_DEVICE_TYPE() { return { value: 18, name: Constants.MANAGE_DEVICE_TYPE }; }

    static get CLIENT_ACTIONS() {
        const actionSet = new Set();

        actionSet.add(HiveAction.GET_NETWORK);
        actionSet.add(HiveAction.GET_DEVICE_TYPE);
        actionSet.add(HiveAction.GET_DEVICE);
        actionSet.add(HiveAction.GET_DEVICE_NOTIFICATION);
        actionSet.add(HiveAction.GET_DEVICE_COMMAND);
        actionSet.add(HiveAction.REGISTER_DEVICE);
        actionSet.add(HiveAction.CREATE_DEVICE_NOTIFICATION);
        actionSet.add(HiveAction.CREATE_DEVICE_COMMAND);
        actionSet.add(HiveAction.UPDATE_DEVICE_COMMAND);
        actionSet.add(HiveAction.GET_CURRENT_USER);
        actionSet.add(HiveAction.UPDATE_CURRENT_USER);
        actionSet.add(HiveAction.MANAGE_TOKEN);
        actionSet.add(HiveAction.MANAGE_PLUGIN);

        return actionSet;
    }

    static get ADMIN_ACTIONS() {
        const actionSet = new Set();

        actionSet.add(HiveAction.MANAGE_USER);
        actionSet.add(HiveAction.MANAGE_CONFIGURATION);
        actionSet.add(HiveAction.MANAGE_NETWORK);
        actionSet.add(HiveAction.MANAGE_DEVICE_TYPE);

        return actionSet;
    }

    static get KNOWN_ACTIONS() {
        return new Set([
            ...HiveAction.CLIENT_ACTIONS,
            ...HiveAction.ADMIN_ACTIONS
        ]);
    }

    constructor(id, value) {
        const me = this;

        me._id = id;
        me._value = value;
    }

    get id() {
        return this._id;
    }

    get value() {
        return this._value;
    }
}


module.exports = HiveAction;
