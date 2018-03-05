/*
 * @TODO For more complicated migrations please see — flywaydb
 */

const loopback = require('loopback');
const ds = loopback.createDataSource('postgresql', {
    "host": "localhost",
    "port": 5432,
    "database": "devicehive",
    "username": "postgres",
    "password": "12345"
});

[
    `Device`,
    `Network`,
    `Configuration`,
    `User`,
    `UserNetwork`,
    `Plugin`,
    `UserDeviceType`,
    `DeviceType`
].forEach(modelName => {
    const modelSchema = require(`../common/models/${modelName}.json`);
    ds.createModel(modelSchema.name, modelSchema.properties, modelSchema.options);
});

ds.isActual((err, actual) => {
    if (err) {
        console.log('Schema is actual error');
        console.error(err);
        process.exit(1);
        return;
    }

    if (!actual) {
        console.log('Schema is not actual');

        ds.autoupdate(err => {
            if (err) {
                console.log('Schema update error');
                console.error(err);
                process.exit(1);
                return;
            }

            console.log('Schema updated');
            process.exit(0);
        });
    } else {
        console.log('Schema is actual');
        process.exit(0);
    }
});
