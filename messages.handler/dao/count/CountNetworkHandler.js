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
        response.errorCode = 400;
        response.failed = true;
        response.withBody(new ErrorResponseBody());
    }

    return response;
};


async function countNetworks (countNetworkRequestBody) {
    const models = await db.getModels();
    const networkDAO = models[`Network`];
    const networkFilterObject = {};

    if (countNetworkRequestBody.namePattern) {
        networkFilterObject.name = { like: countNetworkRequestBody.namePattern };
    } else if (countNetworkRequestBody.name) {
        networkFilterObject.name = countNetworkRequestBody.name;
    }

    return await networkDAO.count(networkFilterObject);
}
