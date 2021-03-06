const debug = require(`debug`)(`request-handler:network-list`);
const db = require(`../../..//db/index`);
const Response = require(`../../../shim/Response`);
const ListNetworkRequestBody = require(`../../../common/model/rpc/ListNetworkRequestBody`);
const ListNetworkResponseBody = require(`../../../common/model/rpc/ListNetworkResponseBody`);


/**
 * Network list request handler
 * @param request
 * @returns {Promise<void>}
 */
module.exports = async (request) => {
    const listNetworkRequestBody = new ListNetworkRequestBody(request.body);
    const response = new Response();

    debug(`Request (correlation id: ${request.correlationId}): ${listNetworkRequestBody}`);

    const networks = await getNetworks(listNetworkRequestBody);

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new ListNetworkResponseBody({
        networks: networks.map((network) => network.toObject())
    }));

    debug(`Response (correlation id: ${request.correlationId}): ${response.body}`);

    return response;
};

/**
 * Fetch Networks from db by predicated
 * @param listNetworkRequestBody
 * @returns {Promise<*>}
 */
async function getNetworks (listNetworkRequestBody) {
    const models = await db.getModels();
    const networkDAO = models[`Network`];
    const userNetworkDAO = models[`UserNetwork`];
    const principal = listNetworkRequestBody.principal;
    const networkFilterObject = { where: {} };


    if (listNetworkRequestBody.skip) {
        networkFilterObject.skip = listNetworkRequestBody.skip;
    }

    if (listNetworkRequestBody.take) {
        networkFilterObject.limit = listNetworkRequestBody.take;
    }

    if (listNetworkRequestBody.sortField) {
        networkFilterObject.order = [`${listNetworkRequestBody.sortField} ${listNetworkRequestBody.sortOrder || 'ASC'}`];
    }

    if (listNetworkRequestBody.namePattern) {
        networkFilterObject.where.name = { like: listNetworkRequestBody.namePattern };
    }

    if (listNetworkRequestBody.name) {
        networkFilterObject.where.name = listNetworkRequestBody.name;
    }

    if (principal) {
        const user = principal.getUser();

        if (user && !user.isAdmin()) {
            const userNetworks = await userNetworkDAO.find({where: {userId: user.id}});
            const userNetworkIds = userNetworks.map(userNetwork => parseInt(userNetwork.networkId));

            networkFilterObject.where.id = { inq: userNetworkIds };
        }

        if (principal.networkIds) {
            let networkIds;

            if (networkFilterObject.where.id) {
                networkIds = networkFilterObject.where.id.inq.filter(networkId => {
                    return principal.networkIds.includes(networkId);
                });
            } else {
                networkIds = principal.networkIds;
            }

            networkFilterObject.where.id = { inq: networkIds };
        }
    }

    return await networkDAO.find(networkFilterObject);
}
