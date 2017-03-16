/*  global process  */
/*  eslint dot-location: "off"  */

(function () {
    "use strict";

    const version = require('../package.json').version;
    const Parameters = require('../src/model/parameters.model');
    const program = require('commander');

    program
        .version(version)
        .option('-p, --path <required>', 'Path of the folder to draw')
        .option('-f, --show-files [optional]', 'Whether or not showing files along folders')
        .option('-l, --log-level [optional]', 'From 0 (debug) to 3 (errors only)', parseInt)
        .option('-i, --ignore-pattern [optional]', 'A glob to identify stuff you don\'t want to be represented', String)
        .option('-o, --output [optional]', 'The path of the file you want your te to be stored to', String)
        .parse(process.argv);

    let parameters = new Parameters();
    parameters.path = program.path || null;
    parameters.showFiles = program.showFiles || false;
    parameters.logLevel = program.logLevel || 3;
    parameters.ignorePattern = program.ignorePattern || "";
    parameters.output = program.output || null;

    module.exports = { parameters };
}())