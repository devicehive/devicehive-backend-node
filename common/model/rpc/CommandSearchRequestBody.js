const Body = require(`../../../shim/Body`);


class CommandSearchRequestBody extends Body {

    constructor({id, deviceIds, names, start, end, returnUpdated, status, sortField, sortOrder, take, skip, ...rest} = {}) {
        super({id, deviceIds, names, start, end, returnUpdated, status, sortField, sortOrder, take, skip, ...rest});

        const me = this;

        me.id = id;
        me.deviceIds = deviceIds;
        me.names = names;
        me.start = start;
        me.end = end;
        me.returnUpdated = returnUpdated;
        me.status = status;
        me.sortField = sortField;
        me.sortOrder = sortOrder;
        me.take = take;
        me.skip = skip;
    }

    get id() {
        const me = this;

        return me._id;
    }

    set id(value) {
        this._id = value;
    }

    get deviceIds() {
        const me = this;

        return me._deviceIds;
    }

    set deviceIds(value) {
        this._deviceIds = value;
    }

    get deviceId() {
        const me = this;

        return me._deviceIds ? me._deviceIds[0] : null;
    }

    get names() {
        const me = this;

        return me._names;
    }

    set names(value) {
        this._names = value;
    }

    get start() {
        const me = this;

        return me._start;
    }

    set start(value) {
        this._start = value;
    }

    get end() {
        const me = this;

        return me._end;
    }

    set end(value) {
        this._end = value;
    }

    get returnUpdated() {
        return this._returnUpdated;
    }

    set returnUpdated(value) {
        this._returnUpdated = value;
    }

    get status() {
        const me = this;

        return me._status;
    }

    set status(value) {
        this._status = value;
    }

    get sortField() {
        const me = this;

        return me._sortField;
    }

    set sortField(value) {
        this._sortField = value;
    }

    get sortOrder() {
        const me = this;

        return me._sortOrder;
    }

    set sortOrder(value) {
        this._sortOrder = value;
    }

    get take() {
        const me = this;

        return me._take;
    }

    set take(value) {
        this._take = value;
    }

    get skip() {
        const me = this;

        return me._skip;
    }

    set skip(value) {
        this._skip = value;
    }

}


module.exports = CommandSearchRequestBody;
