const eventBus = require(`../eventbus/EventBus`);
const DeviceDeleteRequestBody = require(`../common/model/rpc/DeviceDeleteRequestBody`);
const DeviceDeleteResponseBody = require(`../common/model/rpc/DeviceDeleteResponseBody`);
const Response = require(`../shim/Response`);


module.exports = async (request) => {
    const deviceDeleteRequestBody = new DeviceDeleteRequestBody(request.body);
    const response = new Response({ last: false });

    eventBus.unsubscribeDevice(deviceDeleteRequestBody.device);

    response.errorCode = 0;
    response.failed = false;
    response.withBody(new DeviceDeleteResponseBody());

    return response;
};
