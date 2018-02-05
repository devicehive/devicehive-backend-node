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
        response.errorCode = 500;
        response.failed = true;
        response.withBody(new ErrorResponseBody());
    }

    return response;
};


async function countDeviceTypes (countDeviceTypeRequestBody) {
    const models = await db.getModels();
    const deviceTypeDAO = models[`DeviceType`];
    const userDeviceTypeDAO = models[`UserDeviceType`];
    const deviceTypeFilterObject = {};
    const principal = countDeviceTypeRequestBody.principal;


    if (countDeviceTypeRequestBody.namePattern) {
        deviceTypeFilterObject.name = { like: countDeviceTypeRequestBody.namePattern };
    }

    if (countDeviceTypeRequestBody.name) {
        deviceTypeFilterObject.name = countDeviceTypeRequestBody.name;
    }

    if (principal) {
        const user = principal.getUser();

        if (user && !user.isAdmin() && !user.allDeviceTypesAvailable) {
            const userDeviceTypes = await userDeviceTypeDAO.find({ where: { userId: user.id } });
            const userDeviceTypeIds = userDeviceTypes.map(userDeviceType => parseInt(userDeviceType.deviceTypeId));

            deviceTypeFilterObject.id = { inq : userDeviceTypeIds };
        }

        if (principal.deviceTypeIds) {
            let deviceTypeIds;

            if (deviceTypeFilterObject.id) {
                deviceTypeIds = deviceTypeFilterObject.id.inq.filter(deviceTypeId => {
                    return principal.deviceTypeIds.includes(deviceTypeId);
                });
            } else {
                deviceTypeIds = principal.deviceTypeIds;
            }

            deviceTypeFilterObject.id = { inq: deviceTypeIds };
        }
    }

    return await deviceTypeDAO.count(deviceTypeFilterObject);
}
