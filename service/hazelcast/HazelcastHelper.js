const Predicates = require(`hazelcast-client`).Predicates;
const SearchableField = require(`../../common/model/enums/SearchableField`);
const DeviceNotification = require(`../../common/model/DeviceNotification`);


/**
 * Hazelcast helper class
 */
class HazelcastHelper {

    /**
     * Prepares Hazelcast predicates
     * @param {String} entityName
     * @param {Number} id
     * @param {Array<String>} deviceIds
     * @param {Array<Number>} networkIds
     * @param {Array<Number>} deviceTypeIds
     * @param {Array<string>} names
     * @param {Number} from
     * @param {Number} to
     * @param {Boolean} returnUpdated
     * @param {Boolean} status
     * @param {Number} limit
     * @returns {Predicate}
     */
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

    /**
     *
     * @param o1
     * @param o2
     * @returns {number}
     */
    static comparator(o1, o2) {
        const timestamp1 = new Date(o1.timestamp).getTime();
        const timestamp2 = new Date(o2.timestamp).getTime();

        return timestamp2 - timestamp1;
    }
}


module.exports = HazelcastHelper;
