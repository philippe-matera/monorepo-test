const { contains } = require('../collections');

const INT_ARRAY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe('contains', () => {
  it('is stable', () => {
    const obj = { id: 1, name: 'Bob' };
    expect(contains(INT_ARRAY, 1)).toStrictEqual(true);
    expect(contains(obj, 'Bob', 1)).toStrictEqual(true);
    expect(obj).toStrictEqual(obj);
    expect(INT_ARRAY).toStrictEqual(INT_ARRAY);
  });
  describe('Arrays', () => {
    it('type checking', () => {
      expect(contains([1, 2, 3], 3)).toStrictEqual(true);
      expect(contains([1, 2, 3, 3, 3, 3], 3)).toStrictEqual(true);
      expect(contains([], 3)).toStrictEqual(false);
      expect(contains([1, 1, 1, 1], 3)).toStrictEqual(false);
      expect(contains([3], 3)).toStrictEqual(true);
      expect(contains([3], '3')).toStrictEqual(false);
      expect(contains(['3'], '3')).toStrictEqual(true);
      expect(contains(['321'], '3')).toStrictEqual(false);
      expect(contains(['3'], 3)).toStrictEqual(false);
    });
  });
  describe('Object', () => {
    it('type checking', () => {
      expect(contains({ id: 1 }, 3)).toStrictEqual(false);
      expect(contains({ id: 1 }, 1)).toStrictEqual(true);
      expect(contains({ id: 1, name: 'Bob' }, 'Bob')).toStrictEqual(true);
      expect(contains({ id: 1 }, 'Bob')).toStrictEqual(false);
      expect(contains({}, 'Bob')).toStrictEqual(false);
      expect(contains(undefined, 'Bob')).toStrictEqual(false);
    });
  });
});
