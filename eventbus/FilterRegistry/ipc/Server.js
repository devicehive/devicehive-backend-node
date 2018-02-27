const Const = require(`../constants.json`);
const Xev = require(`xev`).default;
const BaseRegistryServer = require(`../BaseRegistryServer`);
const Filter = require(`../../../common/model/eventbus/Filter`);
const Subscriber = require(`../../../common/model/eventbus/Subscriber`);


/**
 * Filter Registry Server class
 */
class Server extends BaseRegistryServer {

    /**
     * Start Filter Registry server
     */
    static start() {
        new Server();
    };

    /**
     * Creates new ComplexMapFilterRegistry object
     */
    constructor() {
        super();

        const me = this;
        const eventEmitter = new Xev();

        eventEmitter.mount();

        eventEmitter.on(`request`, (request) => {
            const requestData = request.data;
            let response;

            switch (request.action) {
                case Const.ACTION.REGISTER:
                    response = me.register(new Filter(requestData.filter), new Subscriber(requestData.subscriber));
                    break;
                case Const.ACTION.UNREGISTER:
                    response = me.unregister(new Subscriber(requestData.subscriber));
                    break;
                case Const.ACTION.GET_SUBSCRIBERS:
                    response = me.getSubscribers(new Filter(requestData.filter));
                    break;
                case Const.ACTION.UNREGISTER_DEVICE:
                    response = me.unregisterDevice(requestData.device);
                    break;
            }

            eventEmitter.emit(`${request.id}-${request.action}`, response);
        });
    }
}


module.exports = Server;
