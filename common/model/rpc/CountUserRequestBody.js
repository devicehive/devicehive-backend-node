const Body = require(`../../../shim/Body`);


class CountUserRequestBody extends Body {

    constructor({ login, loginPattern, role, status, ...rest } = {}) {
        super({ login, loginPattern, role, status, ...rest });

        const me = this;

        me.login = login;
        me.loginPattern = loginPattern;
        me.role = role;
        me.status = status;
    }

    get login() {
        return this._login;
    }

    set login(value) {
        this._login = value;
    }

    get loginPattern() {
        return this._loginPattern;
    }

    set loginPattern(value) {
        this._loginPattern = value;
    }

    get role() {
        return this._role;
    }

    set role(value) {
        this._role = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

}


module.exports = CountUserRequestBody;
