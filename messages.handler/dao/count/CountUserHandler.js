const db = require(`../../../db/index`);
const Response = require(`../../../shim/Response`);
const CountUserRequestBody = require(`../../../common/model/rpc/CountUserRequestBody`);
const CountResponseBody = require(`../../../common/model/rpc/CountResponseBody`);
const ErrorResponseBody = require(`../../../common/model/rpc/ErrorResponseBody`);


module.exports = async (request) => {
    const countUserRequestBody = new CountUserRequestBody(request.body);
    const response = new Response();

    try {
        const count = await countUsers(countUserRequestBody);

        response.errorCode = 0;
        response.failed = false;
        response.withBody(new CountResponseBody({ count: count }));
    } catch (err) {
        response.errorCode = 400;
        response.failed = true;
        response.withBody(new ErrorResponseBody());
    }

    return response;
};


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
