import { expect } from 'chai';
import {
    isRecord,
    propIs,
    compareTypeMap,
    checkTypeArray,
    checkRecordPropertyTypes,
} from '../src/mongo-type-check';
import { TypeMap } from '../types/typechecking-types';

describe('Type Checking Utilities', () => {
    it('should correctly identify records', () => {
        expect(isRecord({ a: 1 })).to.be.true;
        expect(isRecord(null)).to.be.false;
        expect(isRecord(42)).to.be.false;
        expect(isRecord('string')).to.be.false;
    });

    it('should check if object properties match a specific type', () => {
        const obj = { a: 1, b: 'text' };
        expect(propIs(obj, 'a', 'number')).to.be.true;
        expect(propIs(obj, 'b', 'string')).to.be.true;
        expect(propIs(obj, 'b', ['string', 'number'])).to.be.true;
        expect(propIs(obj, 'c', 'string')).to.be.false; // prop doesn't exist
        expect(propIs(obj, 'c', 'undefined')).to.be.false; // prop doesn't exist
    });

    it('should compare object with type map correctly', () => {
        const obj = { a: 1, b: 'text' };
        const map: TypeMap = { a: 'number', b: 'string' };
        expect(compareTypeMap(obj, map)).to.be.true;

        const wrongMap: TypeMap = { a: 'string', b: 'string' };
        expect(compareTypeMap(obj, wrongMap)).to.be.false;
    });

    it('should check array types correctly', () => {
        const arr = [1, 2, 3];
        expect(checkTypeArray(arr, 'number')).to.be.true;

        const mixedArr = [1, 'text', true];
        expect(checkTypeArray(mixedArr, ['number', 'string', 'boolean'])).to.be
            .true;

        const wrongArr = [1, 'text'];
        expect(checkTypeArray(wrongArr, ['number', 'boolean'])).to.be.false;

        const longArr = [1, 'text'];
        expect(checkTypeArray(longArr, ['number'])).to.be.false;

        const shortArr = [1, 'text'];
        expect(checkTypeArray(shortArr, ['number', 'string', 'number'])).to.be
            .false;
    });

    it('should validate record property types', () => {
        const obj = { a: 1, b: 'text', c: 42 };
        expect(checkRecordPropertyTypes(obj, ['string', 'number'])).to.be.true;

        const wrongObj = { a: 1, b: 'text', c: null };
        expect(checkRecordPropertyTypes(wrongObj, ['string', 'number'])).to.be
            .false;
    });
});
