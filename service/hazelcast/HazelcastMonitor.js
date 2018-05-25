const HazelcastConfig = require(`../../config`).hazelcast;
const Xev = require(`xev`).default;
const Utils = require(`../../utils/Utils`);


/**
 * HazelcastMonitor сдфыы
 */
class HazelcastMonitor {

    /**
     * Creates new HazelcastMonitor object
     */
    constructor() {
        const me = this;

        me._eventEmitter = new Xev();
        me._localInputThroughput = 0;
        me._totalInputThroughput = 0;
        me._putCounter = 0;

        if (Utils.isTrue(process.env.isMaster)) {
            me._eventEmitter.mount();

            me._memberCounter = 1;
            me._memberNotificationCounter = 0;

            me._totalInputThroughputTmp = 0;

            me._eventEmitter.on(`register`, () => me._memberCounter += 1);

            me._eventEmitter.on(`inputThroughput`, (inputThroughput) => {
                me._memberNotificationCounter++;
                me._totalInputThroughputTmp += inputThroughput;

                if (me._memberNotificationCounter === me._memberCounter) {
                    me._totalInputThroughput = me._totalInputThroughputTmp;
                    me._memberNotificationCounter = 0;
                    me._totalInputThroughputTmp = 0;

                    me._eventEmitter.emit(`totalInputThroughput`, me._totalInputThroughput);
                }
            });
        } else {
            me._eventEmitter.emit(`register`);

            me._eventEmitter.on(`totalInputThroughput`, (totalInputThroughput) =>
                me._totalInputThroughput = totalInputThroughput);
        }

        me._pollerIntervalHandler = setInterval(() =>
            me._eventEmitter.emit(`inputThroughput`, me._calculateInputThroughput()),
            HazelcastConfig.MONITOR_POLL_INTERVAL_MS);
    }

    /**
     * Increments put counter
     * @param counter
     */
    incrementPutCounter(counter = 1) {
        const me = this;

        me._putCounter += counter;
    }

    /**
     * Returns input throughput of the local node
     * @returns {number}
     */
    getInputThroughput() {
        const me = this;

        return me._localInputThroughput;
    }

    /**
     * Returns input throughput over the all nodes
     * @returns {number}
     */
    getTotalInputThroughput() {
        const me = this;

        return me._totalInputThroughput;
    }

    /**
     * Calculates input throughput
     * @returns {number}
     * @private
     */
    _calculateInputThroughput() {
        const me = this;

        me._localInputThroughput = (me._putCounter * 1000) / HazelcastConfig.MONITOR_POLL_INTERVAL_MS;
        me._putCounter = 0;

        return me._localInputThroughput;
    }
}


module.exports = new HazelcastMonitor();
