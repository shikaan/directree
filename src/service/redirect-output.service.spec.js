"use strict";

(function () {
    const { expect } = require('chai');
    const sinon = require('sinon');
    const fs = require('fs');
    const service = require('./redirect-output.service');
    const logger = require('./logging.service');
    const Parameters = require('../model/parameters.model');

    describe('Service: ReedirectOutput', () => {
        logger.setLogLevel(3);
        it('should be defined', () => {
            expect(!!service).to.equal(true);
        });

        describe('Method: redirectOutput', () => {
            it('should be defined', () => {
                expect(!!service.redirectOutput).to.equal(true);
            });

            it('should return a string if no output is provided', () => {
                let x = service.redirectOutput('asd', new Parameters());

                expect(x).to.equal('asd');
            })

            it('should call fs.writeFile if output is provided', () => {
                let params = new Parameters();
                params.output = '.';

                let fsStub = sinon.stub(fs, 'writeFile');

                service.redirectOutput('asdf', params);

                expect(fsStub.called).to.equal(true);
            })
        })
    })
}());