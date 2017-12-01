
class ComplexMapRegistry {

    static get KEY_SPLITTER() { return `::`; }

    static _buildFirstLevelKey(networkId, deviceTypeId) {
        return `${networkId}${ComplexMapRegistry.KEY_SPLITTER}${deviceTypeId}`;
    }

    static _buildSecondLevelKey( deviceId, eventType, name) {
        return `${deviceId}${ComplexMapRegistry.KEY_SPLITTER}${eventType}${ComplexMapRegistry.KEY_SPLITTER}${name || '*'}`;
    }

    constructor() {
        const me = this;

        me.registryMap = new Map();
        me.subscriptionIdToFilterMap = new Map();
    }

    register(subscription, subscriber) {
        const me = this;
        const networkId = subscription.networkId;
        const deviceTypeId = subscription.deviceTypeId;
        const deviceId = subscription.deviceId;
        const eventType = subscription.eventType;
        const name = subscription.name;
        const firstLevelKey = ComplexMapRegistry._buildFirstLevelKey(networkId, deviceTypeId);
        const secondLevelKey = ComplexMapRegistry._buildSecondLevelKey(deviceId, eventType, name);
        const filterMap = me.registryMap.get(firstLevelKey) || new Map();
        const subscribersSet = filterMap.get(secondLevelKey) || new Set();
        const filters = me.subscriptionIdToFilterMap.get(subscriber.id) || [];

        filters.push({
            firstLevelKey: firstLevelKey,
            secondLevelKey: secondLevelKey
        });

        subscribersSet.add(subscriber);
        filterMap.set(secondLevelKey, subscribersSet);
        me.registryMap.set(firstLevelKey, filterMap);
        me.subscriptionIdToFilterMap.set(subscriber.id, filters);
    }

    unregister(subscriber) {
        const me = this;
        const filters = me.subscriptionIdToFilterMap.get(subscriber.id);

        if (filters) {
            filters.forEach(({firstLevelKey, secondLevelKey}) => {
                const filterMap = me.registryMap.get(firstLevelKey) || new Map();
                const subscribersSet = filterMap.get(secondLevelKey) || new Set();

                subscribersSet.forEach((item) => {
                    if (item.id === subscriber.id) {
                        subscribersSet.delete(item);
                    }
                });

                if (subscribersSet.size === 0) {
                    filterMap.delete(secondLevelKey);

                    if (filterMap.size === 0) {
                        me.registryMap.delete(firstLevelKey);
                    }
                }
            });

            me.subscriptionIdToFilterMap.delete(subscriber.id);
        }
    }

    getSubscribers(subscription) {
        const me = this;
        const networkId = subscription.networkId;
        const deviceTypeId = subscription.deviceTypeId;
        const deviceId = subscription.deviceId;
        const eventType = subscription.eventType;
        const name = subscription.name;
        const firstLevelKey = ComplexMapRegistry._buildFirstLevelKey(networkId, deviceTypeId);
        const secondLevelKey = ComplexMapRegistry._buildSecondLevelKey(deviceId, eventType, name);
        const filterMap = me.registryMap.get(firstLevelKey) || new Map();
        const subscribersSet = filterMap.get(secondLevelKey) || new Set();

        return Array.from(subscribersSet);
    }

}

module.exports = ComplexMapRegistry;
