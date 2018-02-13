const path = require(`path`);
const configurator = require(`json-evn-configurator`);


module.exports = {
    backend: configurator(path.join(__dirname, `../application/config.json`), `BACKEND`),
    proxy: configurator(path.join(__dirname, `../proxy/config.json`), `PROXY`),
    hazelcast: configurator(path.join(__dirname, `../service/hazelcast/config.json`), `HAZELCAST`),
    postgres: configurator(path.join(__dirname, `../db/server/config.json`), `POSTGRES`)
};
