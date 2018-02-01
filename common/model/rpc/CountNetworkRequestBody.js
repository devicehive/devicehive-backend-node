const Body = require(`../../../shim/Body`);
const HivePrincipal = require(`../HivePrincipal`);


class CountNetworkRequestBody extends Body {

    constructor({ name, namePattern, principal, ...rest } = {}) {
        super({ name, namePattern, principal, ...rest });

        const me = this;

        me.name = name;
        me.namePattern = namePattern;
        me.principal = principal;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get namePattern() {
        return this._namePattern;
    }

    set namePattern(value) {
        this._namePattern = value;
    }

    get principal() {
        return this._principal;
    }

    set principal(value) {
        this._principal = value ? new HivePrincipal(value) : value;
    }
}


module.exports = CountNetworkRequestBody;
