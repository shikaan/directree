/*  global beforeEach  */
"use strict";

(function () {
    const { expect } = require('chai');
    const sinon = require('sinon');
    const logger = require('./logging.service');

    describe('Service: Logger', () => {
        let consoleStub;

        beforeEach(() => {
            consoleStub = sinon.stub(console, "log", () => null);
            consoleStub.reset();
        })

        it('should be defined', () => {
            consoleStub.restore()
            expect(!!logger).to.equal(true)
        })

        describe('Method: debug', () => {
            it('should be defined', () => {
                consoleStub.restore()
                expect(!!logger.debug).to.equal(true);
            })

            it('should call console.log if DEBUG', () => {
                logger.setLogLevel({ logLevel: 0 });
                logger.debug('Debug');

                consoleStub.restore()
                expect(consoleStub.called).to.equal(true);
            })

            it('should not call console.log if INFO, WARNING or ERROR', () => {
                logger.setLogLevel({ logLevel: 1 });
                logger.debug('Debug');
                logger.setLogLevel({ logLevel: 2 });
                logger.debug('Debug');
                logger.setLogLevel({ logLevel: 3 });
                logger.debug('Debug');

                consoleStub.restore()
                expect(consoleStub.called).to.equal(false);
            })
        })

        describe('Method: error', () => {
            it('should be defined', () => {
                consoleStub.restore()
                expect(!!logger.error).to.equal(true);
            })

            it('should always call console.log', () => {
                logger.setLogLevel({ logLevel: 3 });
                logger.error('Error');
                logger.setLogLevel({ logLevel: 2 });
                logger.error('Error');
                logger.setLogLevel({ logLevel: 1 });
                logger.error('Error');
                logger.setLogLevel({ logLevel: 0 });
                logger.error('Error');

                consoleStub.restore()
                expect(consoleStub.callCount).to.equal(8);
            })
        })

        describe('Method: info', () => {
            it('should be defined', () => {
                consoleStub.restore()
                expect(!!logger.info).to.equal(true);
            })

            it('should call console.log if DEBUG or INFO', () => {
                logger.setLogLevel({ logLevel: 0 });
                logger.info('Info');
                logger.setLogLevel({ logLevel: 1 });
                logger.info('Info');

                consoleStub.restore()
                expect(consoleStub.callCount).to.equal(2);
            })

            it('should not call console.log if WARNING or ERROR', () => {
                logger.setLogLevel({ logLevel: 2 });
                logger.info('Info');
                logger.setLogLevel({ logLevel: 3 });
                logger.info('Info');

                consoleStub.restore()
                expect(consoleStub.called).to.equal(false);
            })
        })

        describe('Method: warning', () => {
            it('should be defined', () => {
                consoleStub.restore()
                expect(!!logger.warning).to.equal(true);
            })

            it('should call console.log if DEBUG, INFO or WARNING', () => {
                logger.setLogLevel({ logLevel: 0 });
                logger.warning('Warning');
                logger.setLogLevel({ logLevel: 1 });
                logger.warning('Warning');
                logger.setLogLevel({ logLevel: 2 });
                logger.warning('Warning');

                consoleStub.restore()
                expect(consoleStub.callCount).to.equal(6);
            })

            it('should not call console.log if ERROR', () => {
                logger.setLogLevel({ logLevel: 3 });
                logger.warning('Warning');

                consoleStub.restore()
                expect(consoleStub.called).to.equal(false);
            })
        })
    })
}());