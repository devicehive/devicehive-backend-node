const db = require(`../../../db/index`);
const Response = require(`../../../shim/Response`);
const CountPluginRequestBody = require(`../../../common/model/rpc/CountPluginRequestBody`);
const CountResponseBody = require(`../../../common/model/rpc/CountResponseBody`);
const ErrorResponseBody = require(`../../../common/model/rpc/ErrorResponseBody`);


module.exports = async (request) => {
    const countPluginRequestBody = new CountPluginRequestBody(request.body);
    const response = new Response();

    try {
        const count = await countPlugins(countPluginRequestBody);

        response.errorCode = 0;
        response.failed = false;
        response.withBody(new CountResponseBody({ count: count }));
    } catch (err) {
        response.errorCode = 500;
        response.failed = true;
        response.withBody(new ErrorResponseBody());
    }

    return response;
};


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
