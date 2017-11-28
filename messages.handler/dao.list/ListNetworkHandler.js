const db = require(`../../db`);
const Action = require(`../../shim/Action.js`);
const Response = require(`../../shim/Response.js`);
const Principal = require(`../../shim/Principal.js`);


module.exports = async (request) => {
    const principal = new Principal(request.body.principal);
    const response = new Response({ last: true });

    try {
        if (principal.hasAction(Principal.GET_NETWORK_ACTION)) {
            const networks = await getNetworks(request.body, principal);

            response.errorCode = 0;
            response.failed = false;
            response.withBody({ action: Action.LIST_NETWORK_RESPONSE })
                .addField(`networks`, networks.map((network) => network.toObject()));
        } else {
            response.errorCode = 403;
            response.failed = true;
            response.withBody({ action: Action.ERROR_RESPONSE });
        }
    } catch (err) {
        response.errorCode = 400;
        response.failed = true;
        response.withBody({ action: Action.ERROR_RESPONSE });
    }

    return response;
};


async function getNetworks (requestBody, principal) {
    const models = await db.getModels();
    const networkDAO = models[`Network`];
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

    if (!principal.allNetworksAvailable) {
        filterObject.where.id = { inq: principal.networkIds };
    }

    return await networkDAO.find(filterObject);
}
