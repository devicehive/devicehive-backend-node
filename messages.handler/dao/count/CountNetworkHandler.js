const db = require(`../../../db/index`);
const Response = require(`../../../shim/Response`);
const CountNetworkRequestBody = require(`../../../common/model/rpc/CountNetworkRequestBody`);
const CountResponseBody = require(`../../../common/model/rpc/CountResponseBody`);
const ErrorResponseBody = require(`../../../common/model/rpc/ErrorResponseBody`);


module.exports = async (request) => {
    const countNetworkRequestBody = new CountNetworkRequestBody(request.body);
    const response = new Response();

    try {
        const count = await countNetworks(countNetworkRequestBody);

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


async function countNetworks (countNetworkRequestBody) {
    const models = await db.getModels();
    const networkDAO = models[`Network`];
    const userNetworkDAO = models[`UserNetwork`];
    const principal = countNetworkRequestBody.principal;
    const networkFilterObject = {};


    if (countNetworkRequestBody.namePattern) {
        networkFilterObject.name = { like: countNetworkRequestBody.namePattern };
    }

    if (countNetworkRequestBody.name) {
        networkFilterObject.name = countNetworkRequestBody.name;
    }

    if (principal) {
        const user = principal.getUser();

        if (user && !user.isAdmin()) {
            const userNetworks = await userNetworkDAO.find({where: {userId: user.id}});
            const userNetworkIds = userNetworks.map(userNetwork => parseInt(userNetwork.networkId));

            networkFilterObject.id = { inq: userNetworkIds };
        }

        if (principal.networkIds) {
            let networkIds;

            if (networkFilterObject.id) {
                networkIds = networkFilterObject.id.inq.filter(networkId => {
                    return principal.networkIds.includes(networkId);
                });
            } else {
                networkIds = principal.networkIds;
            }

            networkFilterObject.id = { inq: networkIds };
        }
    }

    return await networkDAO.count(networkFilterObject);
}
