const db = require(`../../db`);
const Action = require(`../../shim/Action.js`);
const Response = require(`../../shim/Response.js`);

module.exports = async (request) => {
    const response = new Response();

    try {
        const models = await db.getModels();
        const networkDAO = models[`Network`];
        const networks = await networkDAO.find(buildNetworkFilter(request.body));

        // const models = await db.getModels();
        // const userDAO = models[`User`];
        // const users = await userDAO.findById(1, {
        //     include: {
        //         relation: 'networks',
        //         scope: {
        //             include: { // include orders for the owner
        //                 relation: 'devices',
        //                 // scope: {
        //                 //     where: {orderId: 5} // only select order with id 5
        //                 // }
        //             }
        //         }
        //     }
        // });

        response.last = true;
        response.errorCode = 0;
        response.failed = false;
        response.body = {
            action: Action.LIST_NETWORK_RESPONSE,
            networks: networks.map((network) => network.toObject())
        }
    } catch (err) {
        response.last = true;
        response.errorCode = 500;
        response.failed = true;
    }

    return response;
};

function buildNetworkFilter (requestBody) {
    const filterObject = {};

    if (requestBody.skip) {
        filterObject.skip = requestBody.skip;
    }

    if (requestBody.take) {
        filterObject.limit = requestBody.take;
    }

    if (requestBody.sortField) {
        filterObject.order = [`${requestBody.sortField} ${requestBody.sortOrder || 'ASC'}`];
    }

    if (requestBody.name || requestBody.namePattern) {
        filterObject.where = {};

        if (requestBody.name) {
            filterObject.where.name = requestBody.name
        }
    }

    return filterObject;
}
