const Predicates = require(`hazelcast-client`).Predicates;
const SearchableField = require(`../../common/SearchableField.js`);
const DeviceNotification = require(`../../common/DeviceNotification.js`);

class HazelcastHelper {

    static preparePredicate(entityName, { id, deviceIds, names, from, to, returnUpdated, status }) {
        const predicates = [];
        const namesKey = entityName === DeviceNotification.getClassName() ? SearchableField.NOTIFICATION : SearchableField.COMMAND;
        const timestampKey = returnUpdated ? SearchableField.LAST_UPDATED : SearchableField.TIMESTAMP;

        if (id) { predicates.push(Predicates.isEqualTo(SearchableField.ID, id)); }
        if (deviceIds) { predicates.push(Predicates.inPredicate(SearchableField.DEVICE_IDS, deviceIds)); }
        if (names) { predicates.push(Predicates.inPredicate(namesKey, names)); }
        if (returnUpdated) { predicates.push(Predicates.isEqualTo(SearchableField.IS_UPDATED, returnUpdated)); }
        if (from) { predicates.push(Predicates.greaterThan(timestampKey, new Date(from).getTime())); }
        if (to) { predicates.push(Predicates.lessThan(timestampKey, new Date(to).getTime())); }
        if (status) { predicates.push(Predicates.isEqualTo(SearchableField.STATUS, status)); }

        return Predicates.and(predicates);
    }
}

module.exports = HazelcastHelper;
