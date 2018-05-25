const Const = require(`../constants.json`);
const Xev = require(`xev`).default;
const DistributedFilterRegistry = require(`../DistributedFilterRegistry`);
const uniqid = require(`uniqid`);


const SERVER_ID = uniqid.process();


/**
 * Filter Registry IPC Server class
 */
class Server {

    static get ID() { return SERVER_ID; }

    /**
     * Start Filter Registry server
     */
    static start() {
        new Server();
    }

    /**
     * Creates new ComplexMapFilterRegistry object
     */
    constructor() {
        const me = this;

        me.distributedFilterRegistry = new DistributedFilterRegistry();
        me.eventEmitter = new Xev();

        me.eventEmitter.mount();

        me.eventEmitter.on(`request`, (request) => {
            me._internalDistribution(request);

            if (request.distribute === true) {
                me._externalDistribution(request);
            }
        });
    }

    /**
     *
     * @param request
     * @private
     */
    _internalDistribution(request) {
        const me = this;

        switch (request.action) {
            case Const.ACTION.REGISTER:
                me.eventEmitter.emit(`register`, request);
                break;
            case Const.ACTION.UNREGISTER:
                me.eventEmitter.emit(`unregister`, request);
                break;
            case Const.ACTION.UNREGISTER_DEVICE:
                me.eventEmitter.emit(`unregisterDevice`, request);
                break;
        }
    }

    /**
     *
     * @param request
     * @private
     */
    _externalDistribution(request) {
        const me = this;
        const requestData = request.data;

        switch (request.action) {
            case Const.ACTION.REGISTER:
                me.distributedFilterRegistry.register(requestData.filter, requestData.subscriber, Server.ID);
                break;
            case Const.ACTION.UNREGISTER:
                me.distributedFilterRegistry.unregister(requestData.subscriber, Server.ID);
                break;
            case Const.ACTION.UNREGISTER_DEVICE:
                me.distributedFilterRegistry.unregisterDevice(requestData.device, Server.ID);
                break;
        }
    }
}


module.exports = Server;
