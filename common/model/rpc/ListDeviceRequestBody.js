const Body = require(`../../../shim/Body`);
const HivePrincipal = require(`../HivePrincipal`);


class ListDeviceRequestBody extends Body {

    constructor({ name, namePattern, networkId, networkName, sortField, sortOrder, take, skip, principal, ...rest } = {}) {
        super({ name, namePattern, networkId, networkName, sortField, sortOrder, take, skip, principal, ...rest });

        const me = this;

        me.name = name;
        me.namePattern = namePattern;
        me.networkId = networkId;
        me.networkName = networkName;
        me.sortField = sortField;
        me.sortOrder = sortOrder;
        me.take = take;
        me.skip = skip;
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

    get sortField() {
        return this._sortField;
    }

    set sortField(value) {
        this._sortField = value;
    }

    get sortOrder() {
        return this._sortOrder;
    }

    set sortOrder(value) {
        this._sortOrder = value;
    }

    get take() {
        return this._take;
    }

    set take(value) {
        this._take = value;
    }

    get skip() {
        return this._skip;
    }

    set skip(value) {
        this._skip = value;
    }

    get principal() {
        return this._principal;
    }

    set principal(value) {
        this._principal = value ? new HivePrincipal(value) : value;
    }
}


module.exports = ListDeviceRequestBody;
