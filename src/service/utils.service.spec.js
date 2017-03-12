"use strict";

(function () {
    const { expect } = require('chai');
    const service = require('./utils.service');

    describe('Service: Logging', () => {
        it('should be defined', () => {
            expect(!!service).to.equal(true);
        });

        describe('Method: isEmptyString', () => {
            it('should be defined', () => {
                expect(!!service.isEmptyString).to.equal(true);
            })

            it('should return true in case of null', () => {
                expect(service.isEmptyString(null)).to.equal(true);
            })

            it('should return true in case of \'\'', () => {
                expect(service.isEmptyString('')).to.equal(true);
            })

            it('should return false in case of \'foo-bar\'', () => {
                expect(service.isEmptyString('foo-bar')).to.equal(false);
            })

            it('should return false in case of number sequence', () => {
                expect(service.isEmptyString(1234)).to.equal(false);
            })
        });

        describe('Method: isLastInList', () => {
            it('should be defined', () => {
                expect(!!service.isLastInList).to.equal(true);
            })

            it('should return false if 1 in [1,2,3]', () => {
                expect(service.isLastInList(1, [1, 2, 3])).to.equal(false);
            })

            it('should return false if 3 in [1,2,3]', () => {
                expect(service.isLastInList(3, [1, 2, 3])).to.equal(false);
            })

            it('should return true if 2 in [1,2,3]', () => {
                expect(service.isLastInList(2, [1, 2, 3])).to.equal(true);
            })

            it('should throw if no number is provided as first parameter', () => {
                expect(() => {
                    service.isLastInList('qwe', [1, 2, 3]);
                }).to.throw();

                expect(() => {
                    service.isLastInList(false, [1, 2, 3]);
                }).to.throw();

                expect(() => {
                    service.isLastInList(null, [1, 2, 3]);
                }).to.throw();

                expect(() => {
                    service.isLastInList({}, [1, 2, 3]);
                }).to.throw();
            })

            it('should throw if no array is provided as second parameter', () => {
                expect(() => {
                    service.isLastInList(1, 'qwe')
                }).to.throw();

                expect(() => {
                    service.isLastInList(1, { length: 12 });
                }).to.throw();

                expect(() => {
                    service.isLastInList(1, false);
                }).to.throw();

                expect(() => {
                    service.isLastInList(1, null);
                }).to.throw();
            })
        });
    });
}());