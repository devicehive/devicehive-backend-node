
class ComplexMapRegistry {

    static get KEY_SPLITTER() { return `::`; }

    static _buildFirstLevelKey(networkId, deviceTypeId) {
        return `${networkId}
                ${ComplexMapRegistry.KEY_SPLITTER}
                ${deviceTypeId}`;
    }

    static _buildSecondLevelKey( deviceId, eventType, name) {
        return `${deviceId}${ComplexMapRegistry.KEY_SPLITTER}
                ${eventType}${ComplexMapRegistry.KEY_SPLITTER}
                ${name || '*'}`;
    }

    constructor() {
        const me = this;

        me.registryMap = new Map();
        me.subscriptionIdToFilterMap = new Map();
    }

    register(networkId, deviceTypeId, deviceId, eventType, name, subscriber) {
        const me = this;
        const firstLevelKey = ComplexMapRegistry._buildFirstLevelKey(networkId, deviceTypeId);
        const secondLevelKey = ComplexMapRegistry._buildSecondLevelKey(deviceId, eventType, name);
        const filterMap = me.registryMap.get(firstLevelKey) || new Map();
        const subscribersSet = filterMap.get(secondLevelKey) || new Set();

        subscribersSet.add(subscriber);
        filterMap.set(secondLevelKey, subscribersSet);
        me.registryMap.set(firstLevelKey, filterMap);
        me.subscriptionIdToFilterMap.set(subscriber.id, {
            firstLevelKey: firstLevelKey,
            secondLevelKey: secondLevelKey
        });
    }

    unregister(subscriber) {
        const me = this;
        const { firstLevelKey, secondLevelKey } = me.subscriptionIdToFilterMap.get(subscriber.id);

        const filterMap = me.registryMap.get(firstLevelKey) || new Map();
        const subscribersSet = filterMap.get(secondLevelKey) || new Set();

        subscribersSet.forEach((item) => {
            if (item.id === subscriber.id) {
                subscribersSet.delete(item);
            }
        });
    }

    getSubscribers(networkId, deviceTypeId, deviceId, eventType, name) {
        const me = this;
        const firstLevelKey = ComplexMapRegistry._buildFirstLevelKey(networkId, deviceTypeId);
        const secondLevelKey = ComplexMapRegistry._buildSecondLevelKey(deviceId, eventType, name);
        const filterMap = me.registryMap.get(firstLevelKey) || new Map();
        const subscribersSet = filterMap.get(secondLevelKey) || new Set();

        return Array.from(subscribersSet);
    }

}

module.exports = ComplexMapRegistry;
