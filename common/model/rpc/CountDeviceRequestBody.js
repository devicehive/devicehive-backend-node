const Body = require(`../../../shim/Body`);
const HivePrincipal = require(`../HivePrincipal`);


class CountDeviceRequestBody extends Body {

    constructor({ name, namePattern, networkId, networkName, principal, ...rest } = {}) {
        super({ name, namePattern, networkId, networkName, principal, ...rest });

        const me = this;

        me.name = name;
        me.namePattern = namePattern;
        me.networkId = networkId;
        me.networkName = networkName;
        me.principal = principal ? new HivePrincipal(principal) : principal;
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

    get networkId() {
        return this._networkId;
    }

    set networkId(value) {
        this._networkId = value;
    }

    get networkName() {
        return this._networkName;
    }

    set networkName(value) {
        this._networkName = value;
    }

    get principal() {
        return this._principal;
    }

    set principal(value) {
        this._principal = value;
    }
}


module.exports = CountDeviceRequestBody;
