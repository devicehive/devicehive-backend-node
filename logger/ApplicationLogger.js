const winston = require(`winston`);
const config = winston.config;


/**
 * Application logger facade class.
 */
class ApplicationLogger {

    /**
     *
     * @param applicationTag
     * @param loggerLevel
     */
    init(applicationTag, loggerLevel = `info`) {
        const me = this;
        const loggerConfig = {
            levels: {
                debug: 3,
                info: 2,
                warn: 1,
                error: 0
            },
            colors: {
                debug: `yellow`,
                info: `green`,
                warn: `red`,
                error: `red`
            },
            transports: [
                new (winston.transports.Console)({
                    colorize: true,
                    level: loggerLevel,
                    timestamp: () => (new Date()).toISOString(),
                    formatter: (options) => {
                        const pid = process.pid;
                        const level = config.colorize(options.level, options.level.toUpperCase());
                        const message = options.message;
                        const timeStamp = config.colorize(options.level, options.timestamp());

                        return `${applicationTag}(${pid}) ${level}: ${message} --- ${timeStamp}`;
                    }
                })
            ],
            filters: [(level, msg) => msg.replace(/(\r\n|\n|\r)/gm, ``)]
        };

        me.logger = new (winston.Logger)(loggerConfig);

        return me;
    }

    /**
     * Error log
     * @param str
     */
    err (str) {
        const me = this;

        me.logger.error(str);
    }

    /**
     * Error log (err alias)
     * @param str
     */
    error (str) {
        const me = this;

        me.err(str);
    }

    /**
     * Warning log
     * @param str
     */
    warn (str) {
        const me = this;

        me.logger.warn(str);
    }

    /**
     * Information log
     * @param str
     */
    info (str) {
        const me = this;

        me.logger.info(str);
    }

    /**
     * Debug log
     * @param str
     */
    debug (str) {
        const me = this;

        me.logger.debug(str);
    }
}


module.exports = new ApplicationLogger();
