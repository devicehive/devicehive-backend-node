const HAZELCAST_CONFIG = require(`./service/hazelcast/config.json`);
const SearchableField = require(`./common/SearchableField.js`);
const HazelcastClient = require(`hazelcast-client`).Client;
const Config = require(`hazelcast-client`).Config;

const config = new Config.ClientConfig();

const NOTIFICATIONS_MAP = `NOTIFICATIONS-MAP`;
const COMMANDS_MAP = `COMMANDS-MAP`;

config.networkConfig.addresses = HAZELCAST_CONFIG.addresses;

HazelcastClient
    .newHazelcastClient(config)
    .then(async (hazelcastClient) => {
        let notificationsMap = hazelcastClient.getMap(NOTIFICATIONS_MAP);
        let commandsMap = hazelcastClient.getMap(COMMANDS_MAP);

        await notificationsMap.addIndex(SearchableField.TIMESTAMP, true);

        await commandsMap.addIndex(SearchableField.TIMESTAMP, true);
        await commandsMap.addIndex(SearchableField.LAST_UPDATED, true);
    });


class HazelcastService {
    constructor() {

    }

    init() {

    }

    find() {

    }

    store() {

    }
}

module.exports = HazelcastService;
