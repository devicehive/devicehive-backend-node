const Body = require(`../../../shim/Body`);
const Action = require(`../../../shim/Action`);


class CountResponseBody extends Body {

    constructor({ count, ...rest } = {}) {
        super({ action: Action.COUNT_RESPONSE, count, ...rest });

        const me = this;

        me.count = count;
    }

    get count() {
        const me = this;

        return me._count;
    }

    set count(value) {
        const me = this;

        me._count = value;
    }
}


module.exports = CountResponseBody;
