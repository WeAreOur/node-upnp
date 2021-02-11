const { APP_NAME } = require('../constants');

function Logger(moduleName) {
    return {
        log: (...args) => console.log(`\x1b[0m\x1b[32m${APP_NAME}\x1b[0m > \x1b[33m${moduleName}\x1b[0m:`, ...args),
    };
}

module.exports = Logger;
