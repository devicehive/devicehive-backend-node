const db = require(`../../../db/index`);
const Response = require(`../../../shim/Response`);
const CountDeviceTypeRequestBody = require(`../../../common/model/rpc/CountDeviceTypeRequestBody`);
const CountResponseBody = require(`../../../common/model/rpc/CountResponseBody`);
const ErrorResponseBody = require(`../../../common/model/rpc/ErrorResponseBody`);


module.exports = async (request) => {
    const countDeviceTypeRequestBody = new CountDeviceTypeRequestBody(request.body);
    const response = new Response();

    try {
        const count = await countDeviceTypes(countDeviceTypeRequestBody);

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


async function countDeviceTypes (countDeviceTypeRequestBody) {
    const models = await db.getModels();
    const deviceTypeDAO = models[`DeviceType`];
    const deviceTypeFilterObject = {};

    if (countDeviceTypeRequestBody.namePattern) {
        deviceTypeFilterObject.name = { like: countDeviceTypeRequestBody.namePattern };
    } else if (countDeviceTypeRequestBody.name) {
        deviceTypeFilterObject.name = countDeviceTypeRequestBody.name;
    }

    return await deviceTypeDAO.count(deviceTypeFilterObject);
}
