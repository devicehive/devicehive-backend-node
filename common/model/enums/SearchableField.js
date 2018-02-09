
class SearchableField {
    static get ID() { return `id`; }
    static get DEVICE_ID() { return `deviceId`; }
    static get TIMESTAMP() { return `timestamp`; }
    static get LAST_UPDATED() { return `lastUpdated`; }
    static get DEVICE_IDS() { return `deviceId`; }
    static get NETWORK_IDS() { return `networkId`; }
    static get DEVICE_TYPE_IDS() { return `deviceTypeId`; }
    static get NOTIFICATION() { return `notification`; }
    static get COMMAND() { return `command`; }
    static get STATUS() { return `status`; }
    static get IS_UPDATED() { return `isUpdated`; }
}

module.exports = SearchableField;
