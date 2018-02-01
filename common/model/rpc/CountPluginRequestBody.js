const Body = require(`../../../shim/Body`);
const HivePrincipal = require(`../HivePrincipal`);


class CountPluginRequestBody extends Body {

    constructor({ name, namePattern, topicName, status, userId, principal, ...rest } = {}) {
        super({ name, namePattern, topicName, status, userId, principal, ...rest });

        const me = this;

        me.name = name;
        me.namePattern = namePattern;
        me.topicName = topicName;
        me.status = status;
        me.userId = userId;
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

    get topicName() {
        return this._topicName;
    }

    set topicName(value) {
        this._topicName = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get principal() {
        return this._principal;
    }

    set principal(value) {
        this._principal = value  ? new HivePrincipal(value) : value;
    }
}


module.exports = CountPluginRequestBody;
