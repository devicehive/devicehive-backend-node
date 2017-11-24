const db = require(`../../db`);
const Action = require(`../../shim/Action.js`);
const Response = require(`../../shim/Response.js`);


module.exports = async (request) => {
    const response = new Response({ last: true });

    try {
        const users = await getUsers(request.body);

        response.errorCode = 0;
        response.failed = false;
        response.withBody({ action: Action.LIST_USER_RESPONSE })
            .addField(`users`, users.map((user) => user.toObject()));
    } catch (err) {
        response.errorCode = 400;
        response.failed = true;
        response.withBody({ action: Action.ERROR_RESPONSE });
    }

    return response;
};


async function getUsers (requestBody) {
    const models = await db.getModels();
    const userDAO = models[`User`];
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

    if (requestBody.status) {
        filterObject.where.status = requestBody.status;
    }

    if (requestBody.role) {
        filterObject.where.role = requestBody.role;
    }

    if (requestBody.loginPattern) {
        filterObject.where.login = { like: requestBody.loginPattern };
    } else if (requestBody.login) {
        filterObject.where.login = requestBody.login;
    }

    return await userDAO.find(filterObject);
}
