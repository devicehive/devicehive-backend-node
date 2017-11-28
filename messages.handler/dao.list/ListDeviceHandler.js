const db = require(`../../db`);
const Action = require(`../../shim/Action.js`);
const Response = require(`../../shim/Response.js`);
const Principal = require(`../../shim/Principal.js`);


module.exports = async (request) => {
    const principal = new Principal(request.body.principal);
    const response = new Response({ last: true });

    try {
        if (principal.hasAction(Principal.GET_DEVICE_ACTION)) {
            const devices = await getDevices(request.body, principal);

            response.errorCode = 0;
            response.failed = false;
            response.withBody({ action: Action.LIST_DEVICE_RESPONSE})
                .addField(`devices`, devices.map((device) => device.toObject()));
        } else {
            response.errorCode = 403;
            response.failed = true;
            response.withBody({ action: Action.ERROR_RESPONSE});
        }
    } catch (err) {
        response.errorCode = 400;
        response.failed = true;
        response.withBody({ action: Action.ERROR_RESPONSE});
    }

    return response;
};


async function getDevices (requestBody, principal) {
    const models = await db.getModels();
    const deviceDAO = models[`Device`];
    const deviceFilterObject = { where: {} };
    let devices;

    if (requestBody.skip) {
        deviceFilterObject.skip = requestBody.skip;
    }

    if (requestBody.take) {
        deviceFilterObject.limit = requestBody.take;
    }

    if (requestBody.sortField) {
        deviceFilterObject.order = [`${requestBody.sortField} ${requestBody.sortOrder || 'ASC'}`];
    }

    if (requestBody.namePattern) {
        filterObject.where.name = { like: requestBody.namePattern };
    } else if (requestBody.name) {
        filterObject.where.name = requestBody.name;
    }

    if (requestBody.networkId) {
        deviceFilterObject.where.networkId = requestBody.networkId;
    }

    if (!principal.allDevicesAvailable) {
        deviceFilterObject.where.id = { inq: principal.deviceIds };
    }

    if (requestBody.networkName) {
        deviceFilterObject.where.include = { relation: `network`, scope: { where: { name: requestBody.networkName } } };
    }

    devices = await deviceDAO.find(deviceFilterObject);

    if (requestBody.networkName) { //TODO native join functionality
        devices = devices.filter((device) => !!device.toObject().network );
    }

    return devices;
}
