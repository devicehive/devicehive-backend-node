
class User {

    static get ADMIN_ROLE() { return 0; }

    constructor({ role }) {
        const me = this;

        me.role = role;
    }

    isAdmin() {
        const me = this;

        return me.role === User.ADMIN_ROLE;
    }
}

module.exports = User;
