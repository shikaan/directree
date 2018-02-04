/*  eslint no-console: "off"  */
"use strict";
const colors = require('colors');

const LOG_LEVELS = {
    DEBUG: 0,
    INFO: 1,
    WARNING: 2,
    ERROR: 3
}

let logLevel;

/**
 * @param {Parameters|Object} parameters 
 */
function setLogLevel(parameters) {
    const level = Number.parseInt(parameters.logLevel)
    logLevel = !isNaN(level) && level > -1 && level < 4 ? level : 3;
}

function debug(...args) {
    if (logLevel === LOG_LEVELS.DEBUG)
        console.log(colors.grey('%s'), ...args);
}

function info(...args) {
    if (logLevel <= LOG_LEVELS.INFO) {
        console.log(colors.blue('%s'), ...args);
    }
}

function error(...args) {
    if (logLevel <= LOG_LEVELS.ERROR) {
        console.log('--- ERROR ---'.bgRed.white.bold);
        console.log(colors.red('%s'), ...args);
    }
}

function warning(...args) {
    if (logLevel <= LOG_LEVELS.WARNING) {
        console.log('--- WARNING ---'.bgYellow.white.bold);
        console.log(colors.yellow('%s'), ...args);
    }
}

module.exports = {
    info,
    error,
    warning,
    debug,
    setLogLevel
}