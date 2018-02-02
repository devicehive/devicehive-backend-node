const db = require(`../../..//db/index`);
const Response = require(`../../../shim/Response`);
const ListNetworkRequestBody = require(`../../../common/model/rpc/ListNetworkRequestBody`);
const ListNetworkResponseBody = require(`../../../common/model/rpc/ListNetworkResponseBody`);
const ErrorResponseBody = require(`../../../common/model/rpc/ErrorResponseBody`);


module.exports = async (request) => {
    const listNetworkRequestBody = new ListNetworkRequestBody(request.body);
    const response = new Response({ last: true });

    try {
        const networks = await getNetworks(listNetworkRequestBody);

        response.errorCode = 0;
        response.failed = false;
        response.withBody(new ListNetworkResponseBody({
            networks: networks.map((network) => network.toObject())
        }));
    } catch (err) {
        response.errorCode = 400;
        response.failed = true;
        response.withBody(new ErrorResponseBody());
    }

    return response;
};


async function getNetworks (requestBody) {
    const models = await db.getModels();
    const networkDAO = models[`Network`];
    const principal = requestBody.principal;
    const networkFilterObject = { where: {} };

    if (requestBody.skip) {
        networkFilterObject.skip = requestBody.skip;
    }

    if (requestBody.take) {
        networkFilterObject.limit = requestBody.take;
    }

    if (requestBody.sortField) {
        networkFilterObject.order = [`${requestBody.sortField} ${requestBody.sortOrder || 'ASC'}`];
    }

    if (requestBody.namePattern) {
        networkFilterObject.where.name = { like: requestBody.namePattern };
    } else if (requestBody.name) {
        networkFilterObject.where.name = requestBody.name;
    }

    if (principal && principal.networkIds) {
        networkFilterObject.where.id = { inq: principal.networkIds };
    }

    if (principal && !principal.getUser().isAdmin()) {
        let networks;

        networkFilterObject.include = { relation: `users` };

        networks = await networkDAO.find(networkFilterObject);

        networks = networks.filter((network) => {
            const users = network.toObject().users;

            return users.length > 0 ? users[0].id === principal.user.id : false;
        });

        return networks;
    } else {
        return await networkDAO.find(networkFilterObject);
    }
}
