const Filter = require(`../common/model/eventbus/Filter`);
const HashBasedTable = require(`../utils/HashBasedTable`);
const Utils = require(`../utils/Utils`);


/**
 * ComplexMapFilterRegistry class
 */
class ComplexMapFilterRegistry {

    /**
     * Creates new ComplexMapFilterRegistry object
     */
    constructor() {
        const me = this;

        me.registryTable = new HashBasedTable();
        me.subscriptionIdToFilterMap = new Map();
    }

    /**
     * Registers new subscriber
     * @param filter
     * @param subscriber
     */
    register(filter, subscriber) {
        const me = this;
        const filters = me.subscriptionIdToFilterMap.get(subscriber.id) || [];

        me.registryTable.add(filter.getFirstKey(), filter.getSecondKey(), subscriber);
        filters.push(filter);
        me.subscriptionIdToFilterMap.set(subscriber.id, filters);
    }

    /**
     * Unregisters subscriber
     * @param subscriber
     */
    unregister(subscriber) {
        const me = this;
        const filters = me.subscriptionIdToFilterMap.get(subscriber.id);

        if (filters) {
            filters.forEach((filter) => {
                const subscribersSet = me.registryTable.get(filter.getFirstKey(), filter.getSecondKey());

                if (subscribersSet) {
                    Utils.forEach(Array.from(subscribersSet), (item) => {
                        if (item.id === subscriber.id) {
                            subscribersSet.delete(item);
                        }
                    });

                    if (subscribersSet && subscribersSet.size === 0) {
                        me.registryTable.delete(filter.getFirstKey(), filter.getSecondKey());

                        if (me.registryTable.size(filter.getFirstKey(), filter.getSecondKey()) === 0) {
                            me.registryTable.delete(filter.getFirstKey());
                        }
                    }
                }
            });

            me.subscriptionIdToFilterMap.delete(subscriber.id);
        }
    }

    /**
     * Returns subscribers by filter
     * @param filter
     * @returns {Array<Subscriber>}
     */
    getSubscribers(filter) {
        const me = this;
        const firstKeyWildeCardSubscribersSet = me.registryTable.get(Filter.FIRST_KEY_WILDE_CARD, filter.getSecondKey()) || new Set();
        const deviceIgnoredFirstKeySubscribersSet = me.registryTable.get(filter.getDeviceIgnoredFirstKey(), filter.getSecondKey()) || new Set();
        const filterSubscribersSet = me.registryTable.get(filter.getFirstKey(), filter.getSecondKey()) || new Set();

        return Array.from(firstKeyWildeCardSubscribersSet)
            .concat(Array.from(deviceIgnoredFirstKeySubscribersSet))
            .concat(Array.from(filterSubscribersSet));
    }

    /**
     * Unregisters device subscription
     * @param device
     */
    unregisterDevice(device) {
        const me = this;
        const filter = new Filter({
            networkId: device.networkId,
            deviceTypeId: device.deviceTypeId,
            deviceId: device.deviceId
        });

        me.registryTable.delete(filter.getFirstKey());
    }
}


module.exports = ComplexMapFilterRegistry;
