const db = require(`../../db`);
const Response = require(`../../shim/Response`);
const ListDeviceTypeRequestBody = require(`../../common/model/rpc/ListDeviceTypeRequestBody`);
const ListDeviceTypeResponseBody = require(`../../common/model/rpc/ListDeviceTypeResponseBody`);
const ErrorResponseBody = require(`../../common/model/rpc/ErrorResponseBody`);


module.exports = async (request) => {
    const listDeviceTypeRequestBody = new ListDeviceTypeRequestBody(request.body);
    const response = new Response({ last: true });

    try {
        const deviceTypes = await getDeviceTypes(listDeviceTypeRequestBody);

        response.errorCode = 0;
        response.failed = false;
        response.withBody(new ListDeviceTypeResponseBody( {
            deviceTypes: deviceTypes.map((deviceType) => deviceType.toObject())
        }));
    } catch (err) {
        response.errorCode = 400;
        response.failed = true;
        response.withBody(new ErrorResponseBody());
    }

    return response;
};


async function getDeviceTypes (listDeviceTypeRequestBody) {
    const models = await db.getModels();
    const deviceTypeDAO = models[`DeviceType`];
    const deviceTypeFilterObject = { where: {} };
    let deviceTypes;

    if (listDeviceTypeRequestBody.skip) {
        deviceTypeFilterObject.skip = listDeviceTypeRequestBody.skip;
    }

    if (listDeviceTypeRequestBody.take) {
        deviceTypeFilterObject.limit = listDeviceTypeRequestBody.take;
    }

    if (listDeviceTypeRequestBody.sortField) {
        deviceTypeFilterObject.order = [`${listDeviceTypeRequestBody.sortField} ${listDeviceTypeRequestBody.sortOrder || 'ASC'}`];
    }

    if (listDeviceTypeRequestBody.namePattern) {
        deviceTypeFilterObject.where.name = { like: listDeviceTypeRequestBody.namePattern };
    } else if (listDeviceTypeRequestBody.name) {
        deviceTypeFilterObject.where.name = listDeviceTypeRequestBody.name;
    }

    deviceTypes = await deviceTypeDAO.find(deviceTypeFilterObject);

    return deviceTypes;
}
