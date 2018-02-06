const HAZELCAST_CONFIG = require(`./config.json`);
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

class HazelcastService extends EventEmitter {

    constructor() {
        super();

        const me = this;
        const config = new Config.ClientConfig();

        me.client = null;
        me.isClientReady = false;
        me.notificationsMap = {};
        me.commandsMap = {};

        config.groupConfig = HAZELCAST_CONFIG.groupConfig;
        config.networkConfig.addresses = HAZELCAST_CONFIG.networkConfig.addresses;
        config.serializationConfig.portableFactories[1] = new DevicePortableFactory();
        config.properties["hazelcast.client.event.thread.count"] = HAZELCAST_CONFIG.eventThreadCount;
        config.properties["hazelcast.logging"] = `off`;

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
            });
    }

    async find(entityName, filterValues) {
        const me = this;
        const map = me._getMapByEntityName(entityName);
        const predicate = HazelcastHelper.preparePredicate(entityName, filterValues);

        await me._getClient();
        return await map.valuesWithPredicate(predicate);
    }

    async store(entityName, data) {
        const me = this;
        const map = me._getMapByEntityName(entityName);

        await me._getClient();
        await map.set(data.getHazelcastKey(), data);
    }

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
