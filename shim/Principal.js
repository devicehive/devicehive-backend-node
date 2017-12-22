
class Principal {

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
