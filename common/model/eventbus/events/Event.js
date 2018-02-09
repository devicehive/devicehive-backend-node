const Body = require(`../../../../shim/Body`);


class Event extends Body {

    constructor({ action, ...rest } = {}) {
        super({ action, ...rest });
    }

    getApplicableSubscriptions() {
        throw new Error(`Method getApplicableSubscriptions should be implemented`);
    }
}


module.exports = Event;
