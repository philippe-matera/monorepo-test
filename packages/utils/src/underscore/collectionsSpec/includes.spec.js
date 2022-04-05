const { includes } = require('../collections');

const INT_ARRAY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe('includes', () => {
  it('is stable', () => {
    const obj = { id: 1, name: 'Bob' };
    expect(includes(INT_ARRAY, 1)).toStrictEqual(true);
    expect(includes(obj, 'Bob', 1)).toStrictEqual(true);
    expect(obj).toStrictEqual(obj);
    expect(INT_ARRAY).toStrictEqual(INT_ARRAY);
  });
  describe('Arrays', () => {
    it('works with any types', () => {
      expect(includes([1, 2, 3], 3)).toStrictEqual(true);
      expect(includes([1, 2, 3, 3, 3, 3], 3)).toStrictEqual(true);
      expect(includes([], 3)).toStrictEqual(false);
      expect(includes([1, 1, 1, 1], 3)).toStrictEqual(false);
      expect(includes([3], 3)).toStrictEqual(true);
      expect(includes([3], '3')).toStrictEqual(false);
      expect(includes(['3'], '3')).toStrictEqual(true);
      expect(includes(['321'], '3')).toStrictEqual(false);
      expect(includes(['3'], 3)).toStrictEqual(false);
    });
  });
  describe('Object', () => {
    it('works with any type', () => {
      expect(includes({ id: 1 }, 3)).toStrictEqual(false);
      expect(includes({ id: 1 }, 1)).toStrictEqual(true);
      expect(includes({ id: 1, name: 'Bob' }, 'Bob')).toStrictEqual(true);
      expect(includes({ id: 1 }, 'Bob')).toStrictEqual(false);
      expect(includes({}, 'Bob')).toStrictEqual(false);
      expect(includes(undefined, 'Bob')).toStrictEqual(false);
    });
  });
});
