
class Body {

    constructor({ action, ...rest } = {}) {
        const me = this;

        me.action = action;
        me.rest = rest;
        Object.assign(me, rest);
    }

    get action() {
        const me = this;

        return me._action;
    }

    set action(value) {
        const me = this;

        me._action = value;
    }

    get rest() {
        const me = this;

        return me._rest;
    }

    set rest(value) {
        const me = this;

        me._rest = value;
    }

    toObject() {
        const me = this;

        return Object.assign({
            a: me.action
        }, me.rest);
    }

    toString() {
        const me = this;

        return JSON.stringify(me.toObject());
    }

    addField(fieldName, fieldValue) {
        const me = this;

        me[fieldName] = me.rest[fieldName] = fieldValue;

        return me;
    }

    static normalize({ a, ...rest }) {
        return new Body({
            action: a,
            ...rest
        });
    }
}

module.exports = Body;
