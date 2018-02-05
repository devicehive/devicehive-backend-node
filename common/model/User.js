const UserRole = require(`./enums/UserRole`);


/**
 *
 */
class User {

    constructor({ id, login, passwordHash, passwordSalt, loginAttempts, role, status, lastLogin, data, introReviewed, allDeviceTypesAvailable } = {}) {
        const me = this;

        me.id = id;
        me.login = login;
        me.passwordHash = passwordHash;
        me.passwordSalt = passwordSalt;
        me.loginAttempts = loginAttempts;
        me.role = role;
        me.status = status;
        me.lastLogin = lastLogin;
        me.data = data;
        me.introReviewed = introReviewed;
        me.allDeviceTypesAvailable = allDeviceTypesAvailable;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get login() {
        return this._login;
    }

    set login(value) {
        this._login = value;
    }

    get passwordHash() {
        return this._passwordHash;
    }

    set passwordHash(value) {
        this._passwordHash = value;
    }

    get passwordSalt() {
        return this._passwordSalt;
    }

    set passwordSalt(value) {
        this._passwordSalt = value;
    }

    get loginAttempts() {
        return this._loginAttempts;
    }

    set loginAttempts(value) {
        this._loginAttempts = value;
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

    get lastLogin() {
        return this._lastLogin;
    }

    set lastLogin(value) {
        this._lastLogin = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }

    get introReviewed() {
        return this._introReviewed;
    }

    set introReviewed(value) {
        this._introReviewed = value;
    }

    get allDeviceTypesAvailable() {
        return this._allDeviceTypesAvailable;
    }

    set allDeviceTypesAvailable(value) {
        this._allDeviceTypesAvailable = value;
    }

    isAdmin() {
        const me = this;

        return UserRole.ADMIN.value === me.role;
    }
}

module.exports = User;
