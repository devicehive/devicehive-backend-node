const Const = require(`../constants.json`);
const Xev = require(`xev`).default;
const BaseRegistryServer = require(`../BaseRegistryServer`);
const DistributedFilterRegistry = require(`../DistributedFilterRegistry`);
const Filter = require(`../../../common/model/eventbus/Filter`);
const Subscriber = require(`../../../common/model/eventbus/Subscriber`);


/**
 * Filter Registry IPC Server class
 */
class Server extends BaseRegistryServer {

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
        super();

        const me = this;
        const distributedFilterRegistry = new DistributedFilterRegistry();
        const eventEmitter = new Xev();

        eventEmitter.mount();

        eventEmitter.on(`request`, (request) => {
            const requestData = request.data;
            let response;

            switch (request.action) {
                case Const.ACTION.REGISTER: {
                    const filter = new Filter(requestData.filter);
                    const subscriber = new Subscriber(requestData.subscriber);

                    eventEmitter.emit(Const.ACTION.CLEAR_CACHE);
                    response = me.register(filter, subscriber);
                    distributedFilterRegistry.register(filter, subscriber);
                    break;
                }
                case Const.ACTION.UNREGISTER: {
                    const subscriber = new Subscriber(requestData.subscriber);

                    eventEmitter.emit(Const.ACTION.CLEAR_CACHE);
                    response = me.unregister(subscriber);
                    distributedFilterRegistry.unregister(subscriber);
                    break;
                }
                case Const.ACTION.GET_SUBSCRIBERS: {
                    response = me.getSubscribers(new Filter(requestData.filter));
                    break;
                }
                case Const.ACTION.UNREGISTER_DEVICE: {
                    eventEmitter.emit(Const.ACTION.CLEAR_CACHE);
                    response = me.unregisterDevice(requestData.device);
                    distributedFilterRegistry.unregisterDevice(requestData.device);
                    break;
                }
            }

            eventEmitter.emit(`${request.id}-${request.action}`, response);
        });
    }
}


module.exports = Server;
