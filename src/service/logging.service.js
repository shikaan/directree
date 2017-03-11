/*  eslint no-console: "off"  */
"use strict";

(function(){
    const colors = require('colors');
    const Parameters = require('../model/parameters.model')

    let LOG_LEVELS = {
        DEBUG: 0,
        INFO: 1,
        WARNING: 2,
        ERROR: 3
    }

    let logLevel;

    function setLogLevel(parameters){
        if(parameters instanceof Parameters)
            logLevel = parameters.logLevel;
        else
            logLevel = 3;
    }

    function debug(){
        if(logLevel === LOG_LEVELS.DEBUG)
            console.log(colors.grey.apply(this, arguments))
    } 

    function info(){
        if(logLevel <= LOG_LEVELS.INFO){
            console.log(colors.blue.apply(this, arguments));
        }
    }

    function error(){
        if(logLevel <= LOG_LEVELS.ERROR){
            console.log('--- ERROR ---'.bgRed.white.bold);
            console.log(colors.red.apply(this, arguments));
        }
    }

    function warning(){
        if(logLevel <= LOG_LEVELS.WARNING){
            console.log('--- WARNING ---'.bgYellow.white.bold);
            console.log(colors.yellow.apply(this, arguments));
        }
    }

    module.exports = {
        info: info,
        error: error,
        warning: warning,
        debug: debug,
        setLogLevel: setLogLevel
    }
}())