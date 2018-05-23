const debug = require(`debug`)(`request-handler:user-list`);
const db = require(`../../../db/index`);
const Utils = require(`../../../utils/Utils`);
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


    if (Utils.isDefined(listUserRequestBody.skip)) {
        filterObject.skip = listUserRequestBody.skip;
    }

    if (Utils.isDefined(listUserRequestBody.take)) {
        filterObject.limit = listUserRequestBody.take;
    }

    if (Utils.isDefined(listUserRequestBody.sortField)) {
        filterObject.order = [`${listUserRequestBody.sortField} ${listUserRequestBody.sortOrder || 'ASC'}`];
    }

    if (Utils.isDefined(listUserRequestBody.status)) {
        filterObject.where.status = listUserRequestBody.status;
    }

    if (Utils.isDefined(listUserRequestBody.role)) {
        filterObject.where.role = listUserRequestBody.role;
    }

    if (Utils.isDefined(listUserRequestBody.loginPattern)) {
        filterObject.where.login = { like: listUserRequestBody.loginPattern };
    }

    if (Utils.isDefined(listUserRequestBody.login)) {
        filterObject.where.login = listUserRequestBody.login;
    }

    return await userDAO.find(filterObject);
}
