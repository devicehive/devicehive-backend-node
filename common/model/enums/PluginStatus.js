/**
 *
 */
class PluginStatus {

    static get ACTIVE() { return { value: 0, name: `ACTIVE`}; }
    static get INACTIVE() { return { value: 1, name: `INACTIVE`}; }
    static get CREATED() { return { value: 2, name: `CREATED`}; }

    /**
     *
     * @param {Number} index
     * @returns {String}
     */
    static getStatusByIndex(index) {
        return statusMap.get(index);
    }
}

const statusMap = new Map();

statusMap.set(PluginStatus.ACTIVE.value, PluginStatus.ACTIVE.name);
statusMap.set(PluginStatus.INACTIVE.value, PluginStatus.INACTIVE.name);
statusMap.set(PluginStatus.CREATED.value, PluginStatus.CREATED.name);


module.exports = PluginStatus;
