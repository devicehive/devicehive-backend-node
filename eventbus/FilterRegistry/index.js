const Const = require(`./constants.json`);


module.exports = function (communicationType) {
    let Server, Client;

    switch (communicationType) {
        case Const.COMMUNICATOR_TYPE.IPC:
            Server = require(`./ipc/Server`);
            Client = require(`./ipc/Client`);
            break;
        case Const.COMMUNICATOR_TYPE.UDP:
            Server = require(`./udp/Server`);
            Client = require(`./udp/Client`);
            break;
        default:
            throw `Unsupported communicator type`;
    }

    return { Server, Client };
};
