const debug = require(`debug`)(`request-handler:user-count`);
const db = require(`../../../db/index`);
const Response = require(`../../../shim/Response`);
const CountUserRequestBody = require(`../../../common/model/rpc/CountUserRequestBody`);
const CountResponseBody = require(`../../../common/model/rpc/CountResponseBody`);


/**
 * User count request handler
 * @param request
 * @returns {Promise<void>}
 */
module.exports = async (request) => {
    const countUserRequestBody = new CountUserRequestBody(request.body);
    const response = new Response();

    debug(`Request (correlation id: ${request.correlationId}): ${countUserRequestBody}`);

    const count = await countUsers(countUserRequestBody);

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new CountResponseBody({ count: count }));

    debug(`Response (correlation id: ${request.correlationId}): ${response.body}`);

    return response;
};

/**
 * Fetch Users amount from db by predicates
 * @param countUserRequestBody
 * @returns {Promise<*>}
 */
async function countUsers (countUserRequestBody) {
    const models = await db.getModels();
    const userDAO = models[`User`];
    const userFilterObject = {};


    if (countUserRequestBody.loginPattern) {
        userFilterObject.login = { like: countUserRequestBody.loginPattern };
    } else if (countUserRequestBody.login) {
        userFilterObject.login = countUserRequestBody.login;
    }

    if (countUserRequestBody.role) {
        userFilterObject.role = countUserRequestBody.role;
    }

    if (countUserRequestBody.status) {
        userFilterObject.status = countUserRequestBody.status;
    }

    return await userDAO.count(userFilterObject);
}
