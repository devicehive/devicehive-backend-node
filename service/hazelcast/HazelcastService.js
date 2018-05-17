const debug = require(`debug`)(`hazelcast:service`);
const HazelcastConfig = require(`../../config`).hazelcast;
const EventEmitter = require(`events`);
const SearchableField = require(`../../common/model/enums/SearchableField`);
const HazelcastClient = require(`hazelcast-client`).Client;
const Config = require(`hazelcast-client`).Config;
const HazelcastHelper = require(`./HazelcastHelper`);
const DevicePortableFactory = require(`../../common/model/DevicePortableFactory`);
const DeviceNotification = require(`../../common/model/DeviceNotification`);
const DeviceCommand = require(`../../common/model/DeviceCommand`);

const NOTIFICATIONS_MAP = `NOTIFICATIONS-MAP`;
const COMMANDS_MAP = `COMMANDS-MAP`;


/**
 * Hazelcast service class
 */
class HazelcastService extends EventEmitter {

    static normalizeConfiguration(config) {
        const result = {};
        const hostWithPortList = config.ADDRESSES.split(`,`);
        const addresses = hostWithPortList.map(hostWithPort => {
            const [ host, port ] = hostWithPort.split(`:`);

            return { host, port };
        });

        result.networkConfig = {
            addresses: addresses
        };

        result.groupConfig = {
            name: config.GROUP_NAME,
            password: config.GROUP_PASSWORD
        };

        return result;
    }

    /**
     * Creates new HazelcastService object
     */
    constructor() {
        super();

        const me = this;
        const config = new Config.ClientConfig();

        me.client = null;
        me.isClientReady = false;
        me.notificationsMap = {};
        me.commandsMap = {};

        const hazelcastConfig = HazelcastService.normalizeConfiguration(HazelcastConfig);

        config.groupConfig = hazelcastConfig.groupConfig;
        config.networkConfig.addresses = hazelcastConfig.networkConfig.addresses;
        config.serializationConfig.portableFactories[1] = new DevicePortableFactory();
        config.properties["hazelcast.client.event.thread.count"] = HazelcastConfig.eventThreadCount;
        config.properties["hazelcast.logging"] = HazelcastConfig.LOGGING;

        HazelcastClient
            .newHazelcastClient(config)
            .then(async (hazelcastClient) => {
                me.notificationsMap = hazelcastClient.getMap(NOTIFICATIONS_MAP);
                me.commandsMap = hazelcastClient.getMap(COMMANDS_MAP);

                await me.notificationsMap.addIndex(SearchableField.TIMESTAMP, true);
                await me.commandsMap.addIndex(SearchableField.TIMESTAMP, true);
                await me.commandsMap.addIndex(SearchableField.LAST_UPDATED, true);

                me.client = hazelcastClient;
                me.isClientReady = true;

                me.emit(`clientReady`);

                debug(`Client is ready`);
            });
    }

    /**
     * Find entity
     * @param entityName
     * @param filterValues
     * @returns {Promise<Array>}
     */
    async find(entityName, filterValues) {
        const me = this;
        const map = me._getMapByEntityName(entityName);
        const predicate = HazelcastHelper.preparePredicate(entityName, filterValues);
        let values;

        debug(`Find request. Entity: ${entityName}`);

        await me._getClient();
        values = await map.valuesWithPredicate(predicate);

        return values ? values.toArray() : [];
    }

    /**
     * Store entity
     * @param entityName
     * @param data
     * @returns {Promise<void>}
     */
    async store(entityName, data) {
        const me = this;
        const map = me._getMapByEntityName(entityName);

        debug(`Store request. Entity: ${entityName}`);

        await me._getClient();
        await map.set(data.getHazelcastKey(), data);
    }

    /**
     * Update entity
     * @param entityName
     * @param data
     * @returns {Promise<void>}
     */
    async update(entityName, data) {
        const me = this;
        const map = me._getMapByEntityName(entityName);

        debug(`Update request. Entity: ${entityName}`);

        await me._getClient();
        await map.replace(data.getHazelcastKey(), data);
    }

    /**
     * Returns HazelcastClient when it is ready to use
     * @returns {Promise<HazelcastClient>}
     * @private
     */
    _getClient() {
        const me = this;

        return new Promise((resolve) => {
            if (me.isClientReady === true) {
                resolve(me.client);
            } else {
                me.on(`clientReady`, () => {
                    resolve(me.client);
                });
            }
        });
    }

    /**
     * Returns Hazelcast map by entity name
     * @param entityName
     * @returns {IMap}
     * @private
     */
    _getMapByEntityName(entityName) {
        const me = this;
        let map;

        switch (entityName) {
            case DeviceNotification.getClassName():
                map = me.notificationsMap;
                break;
            case DeviceCommand.getClassName():
                map = me.commandsMap;
                break;
        }

        return map;
    }
}


module.exports = new HazelcastService();
