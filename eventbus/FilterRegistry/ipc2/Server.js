const Const = require(`../constants.json`);
const Xev = require(`xev`).default;
const DistributedFilterRegistry = require(`../DistributedFilterRegistry`);


/**
 * Filter Registry IPC Server class
 */
class Server {

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
        const distributedFilterRegistry = new DistributedFilterRegistry();
        const eventEmitter = new Xev();

        eventEmitter.mount();

        eventEmitter.on(`request`, (request) => {
            const requestData = request.data;

            switch (request.action) {
                case Const.ACTION.REGISTER:
                    eventEmitter.emit(`register`, request);
                    distributedFilterRegistry.register(requestData.filter, requestData.subscriber);
                    break;
                case Const.ACTION.UNREGISTER:
                    eventEmitter.emit(`unregister`, request);
                    distributedFilterRegistry.unregister(requestData.subscriber);
                    break;
                case Const.ACTION.UNREGISTER_DEVICE:
                    eventEmitter.emit(`unregisterDevice`, request);
                    distributedFilterRegistry.unregisterDevice(requestData.device);
                    break;
            }
        });
    }
}


module.exports = Server;
