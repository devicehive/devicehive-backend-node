const debug = require(`debug`)(`request-handler:plugin-list`);
const db = require(`../../../db/index`);
const Response = require(`../../../shim/Response`);
const ListPluginRequestBody = require(`../../../common/model/rpc/ListPluginRequestBody`);
const ListPluginResponseBody = require(`../../../common/model/rpc/ListPluginResponseBody`);
const PluginStatus = require(`../../../common/model/enums/PluginStatus`);


/**
 * Plugin list request handler
 * @param request
 * @returns {Promise<void>}
 */
module.exports = async (request) => {
    const listPluginRequestBody = new ListPluginRequestBody(request.body);
    const response = new Response();

    debug(`Request (correlation id: ${request.correlationId}): ${listPluginRequestBody}`);

    const plugins = await getPlugins(listPluginRequestBody);

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new ListPluginResponseBody({
        plugins: plugins.map(plugin => Object.assign(plugin.toObject(), { status: PluginStatus.getStatusByIndex(plugin.status) }))
    }));

    debug(`Response (correlation id: ${request.correlationId}): ${response.body}`);

    return response;
};

/**
 * Fetch Plugins from db by predicates
 * @param listPluginRequestBody
 * @returns {Promise<*>}
 */
async function getPlugins (listPluginRequestBody) {
    const models = await db.getModels();
    const pluginDAO = models[`Plugin`];
    const pluginFilterObject = { where: {} };
    const principal = listPluginRequestBody.principal;


    if (listPluginRequestBody.skip) {
        pluginFilterObject.skip = listPluginRequestBody.skip;
    }

    if (listPluginRequestBody.take) {
        pluginFilterObject.limit = listPluginRequestBody.take;
    }

    if (listPluginRequestBody.sortField) {
        pluginFilterObject.order = [`${listPluginRequestBody.sortField} ${listPluginRequestBody.sortOrder || 'ASC'}`];
    }

    if (listPluginRequestBody.namePattern) {
        pluginFilterObject.where.name = { like: listPluginRequestBody.namePattern };
    }

    if (listPluginRequestBody.name) {
        pluginFilterObject.where.name = listPluginRequestBody.name;
    }

    if (listPluginRequestBody.topicName) {
        pluginFilterObject.where.topicName = listPluginRequestBody.topicName;
    }

    if (listPluginRequestBody.status) {
        pluginFilterObject.where.status = listPluginRequestBody.status;
    }

    if (listPluginRequestBody.userId) {
        pluginFilterObject.where.userId = listPluginRequestBody.userId;
    }

    if (principal) {
        const user = principal.getUser();

        if (user && !user.isAdmin()) {
            pluginFilterObject.where.userId = user.id;
        }
    }

    return await pluginDAO.find(pluginFilterObject);
}
