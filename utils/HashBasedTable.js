const Utils = require(`./Utils`);


/**
 * HashBasedTable class
 */
class HashBasedTable {

    /**
     * Creates new HashBasedTable object
     */
    constructor() {
        const me = this;

        me.hashMap = new Map();
    }

    /**
     * Checks if keys are exist
     * @param firstKey
     * @param secondKey
     * @returns {boolean}
     */
    has(firstKey, secondKey) {
        const me = this;
        let result = false;

        if (secondKey) {
            const secondLevelMap = me.hashMap.get(firstKey);

            if (secondLevelMap) {
                result = secondLevelMap.has(secondKey);
            }
        } else {
            result = me.hashMap.has(firstKey);
        }

        return result;
    }

    /**
     * Returns value by keys
     * @param firstKey
     * @param secondKey
     * @returns {*}
     */
    get(firstKey, secondKey) {
        const me = this;
        let result;

        if (secondKey) {
            const secondLevelMap = me.hashMap.get(firstKey);

            if (secondLevelMap) {
                result = secondLevelMap.get(secondKey);
            }
        } else {
            result = me.hashMap.get(firstKey);
        }

        return result;
    }

    /**
     * Adds value by keys
     * @param firstKey
     * @param secondKey
     * @param items
     */
    add(firstKey, secondKey, items) {
        const me = this;
        let secondLevelMap = me.hashMap.get(firstKey);

        if (!secondLevelMap) {
            secondLevelMap = new Map();
            me.hashMap.set(firstKey, secondLevelMap);
        }

        let set = secondLevelMap.get(secondKey);

        if (!set) {
            set = new Set();
            secondLevelMap.set(secondKey, set);
        }

        Utils.forEach(items, (item) => set.add(item));
    }

    /**
     * Deletes value by keys
     * @param firstKey
     * @param secondKey
     * @returns {boolean}
     */
    delete(firstKey, secondKey) {
        const me = this;
        let result = false;

        if (secondKey) {
            const secondLevelMap = me.hashMap.get(firstKey);

            if (secondLevelMap) {
                result = secondLevelMap.delete(secondKey);
            }
        } else {
            result = me.hashMap.delete(firstKey);
        }

        return result;
    }

    /**
     * Returns size of map
     * @param firstKey
     * @param secondKey
     * @param needSetSize
     * @returns {*}
     */
    size(firstKey, secondKey, needSetSize=false) {
        const me = this;
        let result;

        if (secondKey) {
            const secondLevelMap = me.hashMap.get(firstKey);

            if (needSetSize) {
                const set = secondLevelMap.get(secondKey);

                if (set) {
                    result = set.size;
                }
            } else {
                result = secondLevelMap.size;
            }
        } else {
            result = me.hashMap.size;
        }

        return result;
    }

}


module.exports = HashBasedTable;
