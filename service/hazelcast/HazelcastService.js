const HAZELCAST_CONFIG = require(`./config.json`);
const EventEmitter = require(`events`);
const SearchableField = require(`../../common/SearchableField.js`);
const HazelcastClient = require(`hazelcast-client`).Client;
const Config = require(`hazelcast-client`).Config;
const HazelcastHelper = require(`./HazelcastHelper.js`);

const DeviceNotification = require(`../../common/DeviceNotification.js`);

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

        config.networkConfig.addresses = HAZELCAST_CONFIG.addresses;

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
        let result;

        await me._getClient();

        try {
            result = await map.valuesWithPredicate(predicate);
        } catch (err) {
            result = [];
        }

        return result;
    }

    async store() {
        const me = this;

        await me._getClient();
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
            case DeviceNotification.name:
                map = me.notificationsMap;
                break
        }

        return map;
    }
}

module.exports = new HazelcastService();
