const Utils = require(`./Utils`);


class HashBasedTable {

    constructor() {
        const me = this;

        me.hashMap = new Map();
    }

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

    size(firstKey, secondKey, needSetSize=false) {
        const me = this;
        let result;

        if (secondKey) {
            const secondLevelMap = me.hashMap.get(firstKey);

            if (needSetSize) {
                set = secondLevelMap.get(secondKey);

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
