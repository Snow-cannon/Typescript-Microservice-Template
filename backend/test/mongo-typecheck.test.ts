import { expect } from 'chai';
import { isWorld } from '../src/mongo-type-check';

describe('Custom Data Type Checks', () => {
    it('should validate correct World objects', () => {
        const invalidWorld = { _id: 123, name: 'Test World' };

        expect(isWorld(invalidWorld)).to.be.false;
    });

    it('should invalidate incorrect World objects', () => {
        const invalidWorld = { _id: 123, name: 'Test World' };

        expect(isWorld(invalidWorld)).to.be.false;
    });
});
