const Predicates = require(`hazelcast-client`).Predicates;
const SearchableField = require(`../../common/model/enums/SearchableField`);
const DeviceNotification = require(`../../common/model/DeviceNotification`);


class HazelcastHelper {

    static preparePredicate(entityName, { id, deviceIds, networkIds, deviceTypeIds, names, from, to, returnUpdated, status, limit } = {}) {
        const predicates = [];
        const namesKey = entityName === DeviceNotification.getClassName() ? SearchableField.NOTIFICATION : SearchableField.COMMAND;
        const timestampKey = returnUpdated ? SearchableField.LAST_UPDATED : SearchableField.TIMESTAMP;

        if (id) { predicates.push(Predicates.isEqualTo(SearchableField.ID, id)); }
        if (deviceIds && deviceIds.length > 0) { predicates.push(Predicates.inPredicate(SearchableField.DEVICE_IDS, ...deviceIds)); }
        if (networkIds && networkIds.length > 0) { predicates.push(Predicates.inPredicate(SearchableField.NETWORK_IDS, ...networkIds)); }
        if (deviceTypeIds && deviceTypeIds.length > 0) { predicates.push(Predicates.inPredicate(SearchableField.DEVICE_TYPE_IDS, ...deviceTypeIds)); }
        if (names && names.length > 0) { predicates.push(Predicates.inPredicate(namesKey, ...names)); }
        if (returnUpdated) { predicates.push(Predicates.isEqualTo(SearchableField.IS_UPDATED, returnUpdated)); }
        if (from) { predicates.push(Predicates.greaterThan(timestampKey, new Date(from).getTime())); }
        if (to) { predicates.push(Predicates.lessThan(timestampKey, new Date(to).getTime())); }
        if (status) { predicates.push(Predicates.isEqualTo(SearchableField.STATUS, status)); }

        return limit && limit > 0 ?
            Predicates.paging(Predicates.and(...predicates), limit) :
            Predicates.and(...predicates);
    }
}

module.exports = HazelcastHelper;
