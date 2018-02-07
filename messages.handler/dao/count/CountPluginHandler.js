const debug = require(`debug`)(`request-handler:plugin-count`);
const db = require(`../../../db/index`);
const Response = require(`../../../shim/Response`);
const CountPluginRequestBody = require(`../../../common/model/rpc/CountPluginRequestBody`);
const CountResponseBody = require(`../../../common/model/rpc/CountResponseBody`);


/**
 * Plugin count request handler
 * @param request
 * @returns {Promise<void>}
 */
module.exports = async (request) => {
    const countPluginRequestBody = new CountPluginRequestBody(request.body);
    const response = new Response();

    debug(`Request (correlation id: ${request.correlationId}): ${countPluginRequestBody}`);

    const count = await countPlugins(countPluginRequestBody);

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new CountResponseBody({ count: count }));

    debug(`Response (correlation id: ${request.correlationId}): ${response.body}`);

    return response;
};

/**
 * Fetch Plugins amount from db by predicates
 * @param countPluginRequestBody
 * @returns {Promise<*>}
 */
async function countPlugins (countPluginRequestBody) {
    const models = await db.getModels();
    const pluginDAO = models[`Plugin`];
    const pluginFilterObject = {};
    const principal = countPluginRequestBody.principal;


    if (countPluginRequestBody.namePattern) {
        pluginFilterObject.name = { like: countPluginRequestBody.namePattern };
    }

    if (countPluginRequestBody.name) {
        pluginFilterObject.name = countPluginRequestBody.name;
    }

    if (countPluginRequestBody.topicName) {
        pluginFilterObject.topicName = countPluginRequestBody.topicName;
    }

    if (countPluginRequestBody.status) {
        pluginFilterObject.status = countPluginRequestBody.status;
    }

    if (countPluginRequestBody.userId) {
        pluginFilterObject.userId = countPluginRequestBody.userId;
    }

    if (principal) {
        const user = principal.getUser();

        if (user && !user.isAdmin()) {
            pluginFilterObject.userId = user.id;
        }
    }

    return await pluginDAO.count(pluginFilterObject);
}
