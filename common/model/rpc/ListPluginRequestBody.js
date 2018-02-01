const Body = require(`../../../shim/Body`);
const HivePrincipal = require(`../HivePrincipal`);


class ListPluginRequestBody extends Body {

    constructor({ name, namePattern, topicName, status, userId, sortField, sortOrderAsc, take, skip, principal, ...rest } = {}) {
        super({ name, namePattern, topicName, status, userId, sortField, sortOrderAsc, take, skip, principal, ...rest });

        const me = this;

        me.name = name;
        me.namePattern = namePattern;
        me.topicName = topicName;
        me.status = status;
        me.userId = userId;
        me.sortField = sortField;
        me.sortOrderAsc = sortOrderAsc;
        me.take = take;
        me.skip = skip;
        me.principal = principal ? new HivePrincipal(principal) : principal;;
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

    get sortField() {
        return this._sortField;
    }

    set sortField(value) {
        this._sortField = value;
    }

    get sortOrderAsc() {
        return this._sortOrderAsc;
    }

    set sortOrderAsc(value) {
        this._sortOrderAsc = value;
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
        this._principal = value;
    }

    get rest() {
        return this._rest;
    }

    set rest(value) {
        this._rest = value;
    }
}


module.exports = ListPluginRequestBody;
