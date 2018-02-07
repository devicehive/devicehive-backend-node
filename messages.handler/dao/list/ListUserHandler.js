const debug = require(`debug`)(`request-handler:user-list`);
const db = require(`../../../db/index`);
const Response = require(`../../../shim/Response`);
const ListUserRequestBody = require(`../../../common/model/rpc/ListUserRequestBody`);
const ListUserResponseBody = require(`../../../common/model/rpc/ListUserResponseBody`);


/**
 * User list request handler
 * @param request
 * @returns {Promise<void>}
 */
module.exports = async (request) => {
    const listUserRequestBody = new ListUserRequestBody(request.body);
    const response = new Response();

    debug(`Request (correlation id: ${request.correlationId}): ${listUserRequestBody}`);

    const users = await getUsers(listUserRequestBody);

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new ListUserResponseBody({
        users: users.map((user) => user.toObject())
    }));

    debug(`Response (correlation id: ${request.correlationId}): ${response.body}`);

    return response;
};

/**
 * Fetch Users from db by predicates
 * @param listUserRequestBody
 * @returns {Promise<*>}
 */
async function getUsers (listUserRequestBody) {
    const models = await db.getModels();
    const userDAO = models[`User`];
    const filterObject = { where: {} };


    if (listUserRequestBody.skip) {
        filterObject.skip = listUserRequestBody.skip;
    }

    if (listUserRequestBody.take) {
        filterObject.limit = listUserRequestBody.take;
    }

    if (listUserRequestBody.sortField) {
        filterObject.order = [`${listUserRequestBody.sortField} ${listUserRequestBody.sortOrder || 'ASC'}`];
    }

    if (listUserRequestBody.status) {
        filterObject.where.status = listUserRequestBody.status;
    }

    if (listUserRequestBody.role) {
        filterObject.where.role = listUserRequestBody.role;
    }

    if (listUserRequestBody.loginPattern) {
        filterObject.where.login = { like: listUserRequestBody.loginPattern };
    }

    if (listUserRequestBody.login) {
        filterObject.where.login = listUserRequestBody.login;
    }

    return await userDAO.find(filterObject);
}
