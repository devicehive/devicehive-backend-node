const db = require(`../../../db/index`);
const Response = require(`../../../shim/Response`);
const ListPluginRequestBody = require(`../../../common/model/rpc/ListPluginRequestBody`);
const ListPluginResponseBody = require(`../../../common/model/rpc/ListPluginResponseBody`);
const ErrorResponseBody = require(`../../../common/model/rpc/ErrorResponseBody`);


module.exports = async (request) => {
    const listPluginRequestBody = new ListPluginRequestBody(request.body);
    const response = new Response({ last: true });

    try {
        const plugins = await getPlugins(listPluginRequestBody);

        response.errorCode = 0;
        response.failed = false;
        response.withBody(new ListPluginResponseBody({
            plugins: plugins.map((plugin) => plugin.toObject())
        }))
    } catch (err) {
        response.errorCode = 500;
        response.failed = true;
        response.withBody(new ErrorResponseBody());
    }

    return response;
};


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
