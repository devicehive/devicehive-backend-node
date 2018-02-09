const EventEmitter = require('events');
const loopback = require('loopback');
const boot = require('loopback-boot');


/**
 * LoopBackApplication class
 */
class LoopBackApplication extends EventEmitter {

    /**
     * Creates new LoopBackApplication object
     */
    constructor() {
        super();

        const me = this;

        me.app = loopback();
        me.isReady = false;

        boot(me.app, __dirname, function (err) {
            if (err) {
                me.emit(`error`, err);
            } else {
                me.emit(`ready`);
                me.isReady = true;
            }
        });
    }

    /**
     * Return models
     * @returns {Promise<Array<Model>>}
     */
    getModels() {
        const me = this;

        return new Promise((resolve) => {
            if (me.isReady) {
                resolve(me.app.models);
            } else {
                me.once(`ready`, () => {
                    resolve(me.app.models);
                });
            }
        });
    }
}


module.exports = LoopBackApplication;
