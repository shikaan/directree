"use strict";

(function(){
    const fs = require('fs');
    const logger = require('./logging.service');

    function redirectOutput(result, parameters){
        let output = parameters.output;

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
            return result
        }
    }

    module.exports = { redirectOutput }
})();