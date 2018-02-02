const db = require(`../../../db/index`);
const Response = require(`../../../shim/Response`);
const ListDeviceRequestBody = require(`../../../common/model/rpc/ListDeviceRequestBody`);
const ListDeviceResponseBody = require(`../../../common/model/rpc/ListDeviceResponseBody`);
const ErrorResponseBody = require(`../../../common/model/rpc/ErrorResponseBody`);


module.exports = async (request) => {
    const listDeviceRequestBody = new ListDeviceRequestBody(request.body);
    const response = new Response({ last: true });

    try {
        const devices = await getDevices(listDeviceRequestBody);

        response.errorCode = 0;
        response.failed = false;
        response.withBody(new ListDeviceResponseBody({
            devices: devices.map((device) => Object.assign(device.toObject(), { id: device.deviceId }))
        }))
    } catch (err) {
        response.errorCode = 400;
        response.failed = true;
        response.withBody(new ErrorResponseBody());
    }

    return response;
};


async function getDevices (listDeviceRequestBody) {
    const models = await db.getModels();
    const deviceDAO = models[`Device`];
    const deviceFilterObject = { where: {}, include: [] } ;
    const principal = listDeviceRequestBody.principal;
    let devices;

    if (listDeviceRequestBody.skip) {
        deviceFilterObject.skip = listDeviceRequestBody.skip;
    }

    if (listDeviceRequestBody.take) {
        deviceFilterObject.limit = listDeviceRequestBody.take;
    }

    if (listDeviceRequestBody.sortField) {
        deviceFilterObject.order = [`${listDeviceRequestBody.sortField} ${listDeviceRequestBody.sortOrder || 'ASC'}`];
    }

    if (listDeviceRequestBody.namePattern) {
        deviceFilterObject.where.name = { like: listDeviceRequestBody.namePattern };
    } else if (listDeviceRequestBody.name) {
        deviceFilterObject.where.name = listDeviceRequestBody.name;
    }

    if (principal && principal.deviceIds) {
        deviceFilterObject.where.deviceId = { inq: principal.deviceIds };
    }

    if (principal && principal.deviceTypeIds) {
        deviceFilterObject.where.deviceTypeId = { inq: principal.deviceTypeIds };
    }

    if (principal && principal.networkIds) {
        deviceFilterObject.where.networkId = { inq: principal.networkIds };
    }

    if (listDeviceRequestBody.networkId && (!principal.networkIds || principal.networkIds.includes(listDeviceRequestBody.networkId)) ) {
        deviceFilterObject.where.networkId = listDeviceRequestBody.networkId;
    }

    if (listDeviceRequestBody.networkName) {
        deviceFilterObject.include.push('network');
    }

    devices = await deviceDAO.find(deviceFilterObject);

    if (listDeviceRequestBody.networkName) { //TODO native join functionality
        devices = devices.filter((device) => {
            return device.toObject().network.name === listDeviceRequestBody.networkName;
        } );
    }

    return devices;
}
