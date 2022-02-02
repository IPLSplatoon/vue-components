import { isBlank, padNumber, pluralize } from '../stringHelper';

describe('stringHelper', () => {
    describe('pluralize', () => {
        it('gives singular form if required', () => {
            expect(pluralize('knife', 1, 'knives')).toEqual('1 knife');
            expect(pluralize('user', 1)).toEqual('1 user');
        });

        it('formats given amount', () => {
            expect(pluralize('knife', 1000, 'knives')).toEqual('1,000 knives');
            expect(pluralize('user', 999999)).toEqual('999,999 users');
        });

        it('gives plural form if required', () => {
            expect(pluralize('knife', 2, 'knives')).toEqual('2 knives');
            expect(pluralize('user', 0)).toEqual('0 users');
        });
    });

    describe('padNumber', () => {
        it('pads number with given amount of zeroes', () => {
            expect(padNumber(1235, 9)).toEqual('000001235');
            expect(padNumber('999', 5)).toEqual('00999');
        });

        it('does not pad number if not necessary', () => {
            expect(padNumber(504278, 5)).toEqual('504278');
            expect(padNumber('1234', 4)).toEqual('1234');
        });
    });

    describe('isBlank', () => {
        it('is true if value is null', () => {
            expect(isBlank(null)).toEqual(true);
        });

        it('is true if value is undefined', () => {
            expect(isBlank(undefined)).toEqual(true);
        });

        it('is true if value is empty', () => {
            expect(isBlank('')).toEqual(true);
        });

        it('is true if value is blank', () => {
            expect(isBlank(' ')).toEqual(true);
            expect(isBlank('     ')).toEqual(true);
            expect(isBlank('\t')).toEqual(true);
            expect(isBlank(' ')).toEqual(true);
            expect(isBlank(' ')).toEqual(true);
            expect(isBlank(' ')).toEqual(true);
            expect(isBlank(' ')).toEqual(true);
            expect(isBlank(' ')).toEqual(true);
            expect(isBlank(' ')).toEqual(true);
            expect(isBlank(' ')).toEqual(true);
            expect(isBlank(' ')).toEqual(true);
            expect(isBlank(' ')).toEqual(true);
            expect(isBlank(' ')).toEqual(true);
            expect(isBlank(' ')).toEqual(true);
            expect(isBlank(' ')).toEqual(true);
            expect(isBlank(' ')).toEqual(true);
            expect(isBlank(' ')).toEqual(true);
            expect(isBlank(' ')).toEqual(true);
            expect(isBlank('　\t')).toEqual(true);
        });

        it('is false if value is not blank', () => {
            expect(isBlank('   test!!!   ')).toEqual(false);
            expect(isBlank('TEST!!!')).toEqual(false);
            expect(isBlank('something')).toEqual(false);
        });
    });
});
