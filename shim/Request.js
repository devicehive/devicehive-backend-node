const uuid = require('uuid/v1');
const Body = require(`./Body`);

class Request {

    static get CLIENT_REQUEST_TYPE () { return 0; }
    static get PING_TYPE () { return 1; }

    static normalize({ b, cId, pK, sre, rTo, t } = {}) {
        return new Request({
            body: Body.normalize(b ? b : {}),
            correlationId: cId,
            partitionKey: pK,
            singleReplyExpected: sre,
            replyTo: rTo,
            type: t
        })
    }

    constructor({ body, correlationId = uuid(), partitionKey, singleReplyExpected, replyTo, type }) {
        const me = this;

        me.body = body;
        me.correlationId = correlationId;
        me.partitionKey = partitionKey;
        me.singleReplyExpected = singleReplyExpected;
        me.replyTo = replyTo;
        me.type = type;
    }

    get body() {
        const me = this;

        return me._body;
    }

    set body(value) {
        const me = this;

        me._body = value;
    }

    get correlationId() {
        const me = this;

        return me._correlationId;
    }

    set correlationId(value) {
        const me = this;

        me._correlationId = value;
    }

    get partitionKey() {
        const me = this;

        return me._partitionKey;
    }

    set partitionKey(value) {
        const me = this;

        me._partitionKey = value;
    }

    get singleReplyExpected() {
        const me = this;

        return me._singleReplyExpected;
    }

    set singleReplyExpected(value) {
        const me = this;

        me._singleReplyExpected = value;
    }

    get replyTo() {
        const me = this;


        return me._replyTo;
    }

    set replyTo(value) {
        const me = this;

        me._replyTo = value;
    }

    get type() {
        const me = this;

        return me._type;
    }

    set type(value) {
        const me = this;

        me._type = value;
    }

    isPing() {
      const me = this;

      return me.type === Request.PING_TYPE;
    }

    isClientRequest() {
      const me = this;

      return me.type === Request.CLIENT_REQUEST_TYPE;
    }

    toString() {
        const me = this;

        return JSON.stringify({
            b: me.body.toString(),
            cId: me.correlationId,
            pK: me.partitionKey,
            sre: me.singleReplyExpected,
            rTo: me.replyTo,
            t: me.type,
        });
    }
}

module.exports = Request;
