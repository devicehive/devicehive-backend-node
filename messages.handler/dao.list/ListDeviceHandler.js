const db = require(`../../db`);
const Action = require(`../../shim/Action.js`);
const Response = require(`../../shim/Response.js`);

module.exports = async (request) => {
    const response = new Response();

    try {
        const models = await db.getModels();
        const deviceDAO = models[`Device`];
        const devices = await deviceDAO.find(buildDeviceFilter(request.body));

        if (request.body.networkName) {
            const networkDAO = models[`Network`];
            const networks = await deviceDAO.find({ where: { name: request.body.networkName }});
        }

        response.last = true;
        response.errorCode = 0;
        response.failed = false;
        response.body = {
            action: Action.LIST_DEVICE_RESPONSE,
            networks: devices.map((device) => device.toObject())
        }
    } catch (err) {
        response.last = true;
        response.errorCode = 500;
        response.failed = true;
    }

    return response;
};

function buildDeviceFilter (requestBody) {
    const filterObject = {};

    if (requestBody.skip) {
        filterObject.skip = requestBody.skip;
    }

    if (requestBody.take) {
        filterObject.limit = requestBody.take;
    }

    if (requestBody.sortField) {
        filterObject.order = [`${requestBody.sortField} ${requestBody.sortOrder || 'ASC'}`];
    }

    if (requestBody.name || requestBody.namePattern || requestBody.networkId || requestBody.networkName) {
        filterObject.where = {};

        if (requestBody.name) {
            filterObject.where.name = requestBody.name
        }

        if (requestBody.networkId) {
            filterObject.where.networkId = requestBody.name
        }
    }

    return filterObject;
}
