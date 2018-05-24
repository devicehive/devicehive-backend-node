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
        const distributedFilterRegistry = new DistributedFilterRegistry();
        const eventEmitter = new Xev();

        eventEmitter.mount();

        eventEmitter.on(`request`, (request) => {
            const requestData = request.data;

            switch (request.action) {
                case Const.ACTION.REGISTER:
                    eventEmitter.emit(`register`, request);
                    distributedFilterRegistry.register(requestData.filter, requestData.subscriber, Server.ID);
                    break;
                case Const.ACTION.UNREGISTER:
                    eventEmitter.emit(`unregister`, request);
                    distributedFilterRegistry.unregister(requestData.subscriber, Server.ID);
                    break;
                case Const.ACTION.UNREGISTER_DEVICE:
                    eventEmitter.emit(`unregisterDevice`, request);
                    distributedFilterRegistry.unregisterDevice(requestData.device, Server.ID);
                    break;
            }
        });
    }
}


module.exports = Server;
