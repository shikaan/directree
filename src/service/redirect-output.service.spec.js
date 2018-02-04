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
        let errorStub, fsStub, infoStub;

        beforeEach(() => {
            fsStub = sinon.stub(fs, 'writeFile');
            errorStub = sinon.stub(logger, 'error');
            infoStub = sinon.stub(logger, 'info');
            fsStub.reset();
            errorStub.reset();
            infoStub.reset();
        });

        afterEach(() => {
            errorStub.restore();
            fsStub.restore();
            infoStub.restore();
        })

        it('should be defined', () => {
            expect(!!service).to.equal(true);
        });

        describe('Method: redirectOutput', () => {
            it('should be defined', () => {
                expect(!!service.redirectOutput).to.equal(true);
            });

            it('should print a string on stdout if no output is provided', () => {
                process.stdout.once('data', (output) => expect(output.toString('utf-8')).to.eq('foo-bar'))
                service.redirectOutput('foo-bar', new Parameters());
            })

            it('should call fs.writeFile if output is provided', () => {
                let params = new Parameters();
                params.output = '.';

                service.redirectOutput('asdf', params);

                fsStub.restore();
                expect(fsStub.called).to.equal(true);
            })

            it('should call logger error in case of writeFile error', () => {
                let params = new Parameters();
                params.output = '.';

                fsStub.yields(new Error('error'));

                service.redirectOutput('asdf', params);

                errorStub.restore();
                fsStub.restore();
                expect(fsStub.called).to.equal(true);
                expect(errorStub.called).to.equal(true);
            })

            it('should call logger info in case of writeFile success', () => {
                let params = new Parameters();
                params.output = '.';

                fsStub.yields(null);

                service.redirectOutput('asdf', params);

                errorStub.restore();
                infoStub.restore();
                expect(fsStub.called).to.equal(true);
                expect(infoStub.called).to.equal(true);
            })
        })
    })
}());