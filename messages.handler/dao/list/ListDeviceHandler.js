const debug = require(`debug`)(`request-handler:device-list`);
const db = require(`../../../db/index`);
const Utils = require(`../../../utils/Utils`);
const Response = require(`../../../shim/Response`);
const ListDeviceRequestBody = require(`../../../common/model/rpc/ListDeviceRequestBody`);
const ListDeviceResponseBody = require(`../../../common/model/rpc/ListDeviceResponseBody`);


/**
 * Device list request handler
 * @param request
 * @returns {Promise<void>}
 */
module.exports = async (request) => {
    const listDeviceRequestBody = new ListDeviceRequestBody(request.body);
    const response = new Response();

    debug(`Request (correlation id: ${request.correlationId}): ${listDeviceRequestBody}`);

    const devices = await getDevices(listDeviceRequestBody);

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new ListDeviceResponseBody({
        devices: devices.map((device) => Object.assign(device.toObject(), { id: device.deviceId }))
    }));

    debug(`Response (correlation id: ${request.correlationId}): ${response.body}`);

    return response;
};

/**
 * Fetch Devices from db by predicates
 * @param listDeviceRequestBody
 * @returns {Promise<*>}
 */
async function getDevices (listDeviceRequestBody) {
    const models = await db.getModels();
    const deviceDAO = models[`Device`];
    const networkDAO = models[`Network`];
    const userNetworkDAO = models[`UserNetwork`];
    const deviceFilterObject = { where: {} } ;
    const principal = listDeviceRequestBody.principal;


    if (Utils.isDefined(listDeviceRequestBody.skip)) {
        deviceFilterObject.skip = listDeviceRequestBody.skip;
    }

    if (Utils.isDefined(listDeviceRequestBody.take)) {
        deviceFilterObject.limit = listDeviceRequestBody.take;
    }

    if (Utils.isDefined(listDeviceRequestBody.sortField)) {
        deviceFilterObject.order = [`${listDeviceRequestBody.sortField} ${listDeviceRequestBody.sortOrder || 'ASC'}`];
    }

    if (Utils.isDefined(listDeviceRequestBody.namePattern)) {
        deviceFilterObject.where.name = { like: listDeviceRequestBody.namePattern };
    }

    if (Utils.isDefined(listDeviceRequestBody.name)) {
        deviceFilterObject.where.name = listDeviceRequestBody.name;
    }

    if (Utils.isDefined(listDeviceRequestBody.networkId)) {
        deviceFilterObject.where.networkId = { inq: [ listDeviceRequestBody.networkId ] };
    }

    if (Utils.isDefined(listDeviceRequestBody.networkName)) {
        const networkFilterObject = { where: { name: listDeviceRequestBody.networkName } };
        let networks;

        if (Utils.isDefined(listDeviceRequestBody.networkId)) {
            networkFilterObject.where.id = listDeviceRequestBody.networkId;
        }

        networks = await networkDAO.find(networkFilterObject);

        deviceFilterObject.networkId = { inq: networks.map(network => parseInt(network.id)) };
    }

    if (principal) {
        const user = principal.getUser();

        if (user && !user.isAdmin()) {
            if (Utils.isDefined(deviceFilterObject.where.networkId)) {
                const userNetworks = await userNetworkDAO.find({where: {userId: user.id}});
                const userNetworkIds = userNetworks.map(userNetwork => parseInt(userNetwork.networkId));

                const filteredNetworkIds = deviceFilterObject.where.networkId.inq.filter(networkId => {
                    return userNetworkIds.includes(networkId);
                });

                deviceFilterObject.where.networkId = { inq: filteredNetworkIds };
            }
        }

        if (Utils.isDefined(principal.networkIds)) {
            deviceFilterObject.where.networkId = { inq: principal.networkIds };
        }

        if (Utils.isDefined(principal.deviceTypeIds)) {
            deviceFilterObject.where.deviceTypeId = { inq: principal.deviceTypeIds };
        }
    }

    return await deviceDAO.find(deviceFilterObject);
}
