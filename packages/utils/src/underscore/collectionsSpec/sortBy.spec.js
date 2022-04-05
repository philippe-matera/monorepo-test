const { sortBy } = require('../collections');

const INT_ARRAY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const OBJ_ARRAY = [
  {
    name: 'Bob',
    id: 3,
  },
  {
    name: 'Jean',
    id: 2,
  },
  {
    name: 'Jacques',
    id: 1,
  },
  {
    name: 'Hubert',
    id: 5,
  },
  {
    name: 'Daniel',
    id: 4,
  },
];
const ORDERED_BY_ID = [
  {
    id: 1,
    name: 'Jacques',
  },
  {
    id: 2,
    name: 'Jean',
  },
  {
    id: 3,
    name: 'Bob',
  },
  {
    id: 4,
    name: 'Daniel',
  },
  {
    id: 5,
    name: 'Hubert',
  },
];

describe('sortBy', () => {
  it('is stable', () => {
    const array = sortBy(INT_ARRAY, (num) => -num);
    // spread needed bcs reverse isn't stable
    expect(array).toStrictEqual([...INT_ARRAY].reverse());
    expect(INT_ARRAY).toStrictEqual(INT_ARRAY);
  });
  describe('Arrays', () => {
    it('works with function as iteratees', () => {
      expect(sortBy(INT_ARRAY, (num) => Math.sin(num))).toStrictEqual([5, 4, 10, 6, 0, 3, 9, 7, 1, 2, 8]);
      expect(sortBy(INT_ARRAY, (num) => num)).toStrictEqual(INT_ARRAY);
      // spread needed bcs reverse isn't stable
      expect(sortBy(INT_ARRAY, (num) => -num)).toStrictEqual([...INT_ARRAY].reverse());
    });
    it('works with String as iteratee', () => {
      expect(sortBy(OBJ_ARRAY)).toStrictEqual(OBJ_ARRAY);
      expect(sortBy(OBJ_ARRAY, 'id')).toStrictEqual(ORDERED_BY_ID);
    });
    it('works with undefined', () => {
      expect(sortBy()).toStrictEqual([]);
      expect(sortBy(undefined)).toStrictEqual([]);
    });
  });
});
