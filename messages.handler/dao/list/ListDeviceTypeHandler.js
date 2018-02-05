const db = require(`../../../db/index`);
const Response = require(`../../../shim/Response`);
const ListDeviceTypeRequestBody = require(`../../../common/model/rpc/ListDeviceTypeRequestBody`);
const ListDeviceTypeResponseBody = require(`../../../common/model/rpc/ListDeviceTypeResponseBody`);
const ErrorResponseBody = require(`../../../common/model/rpc/ErrorResponseBody`);


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
        response.errorCode = 500;
        response.failed = true;
        response.withBody(new ErrorResponseBody());
    }

    return response;
};


async function getDeviceTypes (listDeviceTypeRequestBody) {
    const models = await db.getModels();
    const deviceTypeDAO = models[`DeviceType`];
    const userDeviceTypeDAO = models[`UserDeviceType`];
    const deviceTypeFilterObject = { where: {} };
    const principal = listDeviceTypeRequestBody.principal;


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
    }

    if (listDeviceTypeRequestBody.name) {
        deviceTypeFilterObject.where.name = listDeviceTypeRequestBody.name;
    }

    if (principal) {
        const user = principal.getUser();

        if (user && !user.isAdmin() && !user.allDeviceTypesAvailable) {
            const userDeviceTypes = await userDeviceTypeDAO.find({ where: { userId: user.id } });
            const userDeviceTypeIds = userDeviceTypes.map(userDeviceType => parseInt(userDeviceType.deviceTypeId));

             deviceTypeFilterObject.where.id = { inq : userDeviceTypeIds };
        }

        if (principal.deviceTypeIds) {
            let deviceTypeIds;

            if (deviceTypeFilterObject.where.id) {
                deviceTypeIds = deviceTypeFilterObject.where.id.inq.filter(deviceTypeId => {
                    return principal.deviceTypeIds.includes(deviceTypeId);
                });
            } else {
                deviceTypeIds = principal.deviceTypeIds;
            }

            deviceTypeFilterObject.where.id = { inq: deviceTypeIds };
        }
    }

    return await deviceTypeDAO.find(deviceTypeFilterObject);
}
