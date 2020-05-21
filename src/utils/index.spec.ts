import { generateId, formatDate, getJarTitle, csx } from './';
import { Jar } from '../types';

describe('Utils 🧰', () => {
  describe('generateId()', () => {
    it('should generate unique id each time', () => {
      const firstId = generateId();
      const secondId = generateId();

      expect(firstId).not.toEqual(secondId);
    });
  });
  describe('formatDate()', () => {
    it('should format date based on iso string', () => {
      const isoStringFake = '2020-05-21T18:55:24.369Z';
      const formattedDate = formatDate(isoStringFake);

      expect(formattedDate).toMatchInlineSnapshot(
        `"2020-05-21 20:55:24"`,
      );
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
      expect(getJarTitle(jarFake)).toMatchInlineSnapshot(
        `"Słoik 1 - 100 PLN"`,
      );
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
});
