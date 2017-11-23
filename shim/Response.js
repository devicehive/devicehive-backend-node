const Body = require(`./Body.js`);

class Response {

    constructor({body, correlationId, last, errorCode, failed}) {
        const me = this;

        me.body = body;
        me.correlationId = correlationId;
        me.last = last;
        me.errorCode = errorCode;
        me.failed = failed;
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

    get last() {
        const me = this;

        return me._last;
    }

    set last(value) {
        const me = this;

        me._last = value;
    }

    get errorCode() {
        const me = this;

        return me._errorCode;
    }

    set errorCode(value) {
        const me = this;

        me._errorCode = value;
    }

    get failed() {
        const me = this;

        return me._failed;
    }

    set failed(value) {
        const me = this;

        me._failed = value;
    }

    toString() {
        const me = this;

        return JSON.stringify({
            b: me.body ? me.body.toString() : ``,
            cId: me.correlationId,
            l: me.last,
            err: me.errorCode,
            fld: me.failed
        });
    }

    static normalize(data) {
        return new Response({
            body: Body.normalize(data.b ? JSON.parse(data.b) : {}),
            correlationId: data.cId,
            last: data.l,
            errorCode: data.err,
            failed: data.fld
        })
    }

}

module.exports = Response;
