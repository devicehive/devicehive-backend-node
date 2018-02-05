
/**
 *
 */
class UserRole {
    static get ADMIN() { return { value: 0, name: `ADMIN`}; }
    static get CLIENT() { return { value: 1, name: `CLIENT`}; }
}


module.exports = UserRole;
