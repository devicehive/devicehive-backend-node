const db = require(`../../../db/index`);
const Response = require(`../../../shim/Response`);
const CountDeviceRequestBody = require(`../../../common/model/rpc/CountDeviceRequestBody`);
const CountResponseBody = require(`../../../common/model/rpc/CountResponseBody`);
const ErrorResponseBody = require(`../../../common/model/rpc/ErrorResponseBody`);


module.exports = async (request) => {
    const countDeviceRequestBody = new CountDeviceRequestBody(request.body);
    const response = new Response();

    try {
        const count = await countDevices(countDeviceRequestBody);

        response.errorCode = 0;
        response.failed = false;
        response.withBody(new CountResponseBody({ count: count }));
    } catch (err) {
        response.errorCode = 400;
        response.failed = true;
        response.withBody(new ErrorResponseBody());
    }

    return response;
};


async function countDevices (countDeviceRequestBody) {
    const models = await db.getModels();
    const deviceDAO = models[`Device`];
    const deviceFilterObject = { where: {} };
    const principal = countDeviceRequestBody.principal;
    let devices;

    if (countDeviceRequestBody.namePattern) {
        deviceFilterObject.where.name = { like: countDeviceRequestBody.namePattern };
    } else if (countDeviceRequestBody.name) {
        deviceFilterObject.where.name = countDeviceRequestBody.name;
    }

    if (countDeviceRequestBody.networkId) {
        deviceFilterObject.where.networkId = countDeviceRequestBody.networkId;
    }

    if (principal && !principal.allDeviceTypesAvailable && principal.deviceIds) {
        deviceFilterObject.where.deviceId = { inq: principal.deviceIds };
    }

    if (countDeviceRequestBody.networkName) {
        deviceFilterObject.include = { relation: `network`, scope: { where: { name: countDeviceRequestBody.networkName } } };
    }

    devices = await deviceDAO.find(deviceFilterObject);

    if (countDeviceRequestBody.networkName) { //TODO native join functionality
        devices = devices.filter((device) => !!device.toObject().network);
    }

    return devices.length;
}
