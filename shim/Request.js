const Body = require(`./Body.js`);

class Request {

    constructor({body, correlationId, partitionKey, singleReplyExpected, replyTo, type}) {
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

    static normalize(data) {
        return new Request({
            body: Body.normalize(data.b ? JSON.parse(data.b) : {}),
            correlationId: data.cId,
            partitionKey: data.pK,
            singleReplyExpected: data.sre,
            replyTo: data.rTo,
            type: data.t
        })
    }
}

module.exports = Request;
