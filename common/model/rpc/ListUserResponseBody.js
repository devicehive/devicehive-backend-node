const Body = require(`../../../shim/Body.js`);


class ListUserResponseBody extends Body {

    constructor({ users, ...rest } = {}) {
        super({ users, ...rest });

        const me = this;

        me.users = users;
    }

    get users() {
        return this._users;
    }

    set users(value) {
        this._users = value;
    }
}


module.exports = ListUserResponseBody;
