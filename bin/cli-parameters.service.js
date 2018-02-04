/*  global process  */
/*  eslint dot-location: "off"  */
const version = require('../package.json').version;
const Parameters = require('../src/model/parameters.model');
const program = require('commander');

program
    .version(version)
    .usage('[options] <path>')
    .option('-f, --show-files', 'Whether or not showing files along folders')
    .option('-l, --log-level', 'From 0 (debug) to 3 (errors only)', Number.parseInt)
    .option('-i, --ignore-pattern', 'A glob to identify stuff you don\'t want to be represented', String)
    .option('-o, --output', 'The path of the file you want your te to be stored to', String)
    .parse(process.argv);


const {
    args,
    showFiles,
    logLevel,
    ignorePattern,
    output
} = program;

const parameters = Object.assign(new Parameters(), {
    path: args[0] || null,
    showFiles: showFiles || false,
    logLevel: Number.isNaN(logLevel) ? 3 : logLevel,
    output,
    ignorePattern: ignorePattern || ""
});

module.exports = { parameters };