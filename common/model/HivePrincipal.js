const Long = require(`long`);

class HivePrincipal {

    static get FACTORY_ID() { return 1; }
    static get CLASS_ID() { return 3; }

    static getClassName() { return HivePrincipal.name };

    constructor({ } = {}) {
        const me = this;

    }

    getFactoryId() {
        return HivePrincipal.FACTORY_ID;
    };

    getClassId() {
        return HivePrincipal.CLASS_ID;
    };

    writePortable(writer) {
        const me = this;

    };

    readPortable(reader) {
        const me = this;

    };
}

module.exports = HivePrincipal;
