const db = require(`../../db`);
const Response = require(`../../shim/Response`);
const Principal = require(`../../shim/Principal`);
const ListNetworkRequestBody = require(`../../common/model/rpc/ListNetworkRequestBody`);
const ListNetworkResponseBody = require(`../../common/model/rpc/ListNetworkResponseBody`);
const ErrorResponseBody = require(`../../common/model/rpc/ErrorResponseBody`);


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
    const filterObject = { where: {} };

    if (requestBody.skip) {
        filterObject.skip = requestBody.skip;
    }

    if (requestBody.take) {
        filterObject.limit = requestBody.take;
    }

    if (requestBody.sortField) {
        filterObject.order = [`${requestBody.sortField} ${requestBody.sortOrder || 'ASC'}`];
    }

    if (requestBody.namePattern) {
        filterObject.where.name = { like: requestBody.namePattern };
    } else if (requestBody.name) {
        filterObject.where.name = requestBody.name;
    }

    if (principal && !principal.allNetworksAvailable && principal.networkIds) {
        filterObject.where.id = { inq: principal.networkIds };
    }

    return await networkDAO.find(filterObject);
}
