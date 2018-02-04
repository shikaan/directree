'use strict';

const fs = require('fs');
const logger = require('./logging.service');

function redirectOutput(result, { output }){
    logger.debug('Redirecting output to', output);

    if(output){
        fs.writeFile(output, result, (error) => {
            if(error){
                logger.error('Unable to write on: ', output);
                logger.debug(error);
                return;
            }

            logger.info('Successfully written: ', output)
        });
    }
    else{
        return process.stdout.write(result);
    }
}

module.exports = { redirectOutput }