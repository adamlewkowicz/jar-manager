/* eslint-disable */
import { generateId, getJarTitle, csx } from '.';
import type { Jar } from '../types';
import { sortCompare, getJarIdsFromTransaction } from './common';

describe('Utils 🧰', () => {
  describe('generateId()', () => {
    it('should generate unique id each time', () => {
      const firstId = generateId();
      const secondId = generateId();

      expect(firstId).not.toEqual(secondId);
    });
  });
  describe('getJarTitle()', () => {
    it('should format jar title properly', () => {
      const jarFake: Jar = {
        id: 1,
        balance: 100,
        currency: 'PLN',
        isDefault: false,
      };
      expect(getJarTitle(jarFake)).toMatchInlineSnapshot('"Słoik 1 - 100 PLN"');
    });
  });
  describe('csx()', () => {
    it('should join class names properly', () => {
      const classNamesMock = {
        item: 'item',
        container: 'container',
      };

      const joinedClassNames = csx({
        [classNamesMock.container]: true,
        [classNamesMock.item]: false,
      });

      expect(joinedClassNames).not.toContain(classNamesMock.item);
    });
  });
  describe('sortCompare()', () => {
    it('should return short result based on given items', () => {
      expect(sortCompare(1, 2)).toEqual(-1);
      expect(sortCompare(1, 1)).toEqual(0);
      expect(sortCompare(2, 1)).toEqual(1);
    });
  });
  describe('getJarIdsFromTransaction()', () => {
    it('should extract jar ids from given transaction', () => {
      const transactionFake: any = {
        fromJarId: 1,
        toJarId: 2,
        type: 'exchange',
      };

      expect(getJarIdsFromTransaction(transactionFake).length).toBeGreaterThan(0);
    });
  });
});
