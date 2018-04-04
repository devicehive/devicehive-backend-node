const Config = require(`../config`).backend;
const Const = require(`../common/Constants`);
const logger = require(`../logger/ApplicationLogger`).init(`DH BACKEND`, Config.LOGGER_LEVEL);
const cluster = require('cluster');
const os = require('os');


if (cluster.isMaster) {
    const clusterWorkers = Config.CLUSTER_WORKERS;
    const amountOfWorkers = (clusterWorkers === Const.CPU_TAG ? os.cpus().length : clusterWorkers) - 1;
    const workers = [];
    const spawn = (i) => {
        workers[i] = cluster.fork();
        workers[i].on('exit', () => spawn(i));
    };

    logger.info(`DeviceHive Backend process will be started in cluster mode with ${amountOfWorkers + 1} workers`);

    for (let i = 0; i < amountOfWorkers; i++) {
        spawn(i);
    }
}

process.env.isMaster = cluster.isMaster;

require(`./DeviceHiveBackendApplication`);
