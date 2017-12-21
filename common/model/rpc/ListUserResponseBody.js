const Body = require(`../../../shim/Body`);
const Action = require(`../../../shim/Action`);


class ListUserResponseBody extends Body {

    constructor({ users, ...rest } = {}) {
        super({ action: Action.LIST_USER_RESPONSE, users, ...rest });

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
