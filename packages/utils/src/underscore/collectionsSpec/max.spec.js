const { max } = require('../collections');

const INT_ARRAY = [-1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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

describe('max', () => {
  it('works without predicate', () => {
    expect(max(INT_ARRAY)).toStrictEqual(10);
    expect(max([9, 8, 8, 2, 1])).toStrictEqual(9);
  });
  it('works with function as predicate', () => {
    expect(max(INT_ARRAY, (a) => ++a)).toStrictEqual(10);
    expect(max(OBJ_ARRAY, (a) => a.id)).toStrictEqual({ id: 5, name: 'Hubert' });
  });
  it('works on Objects', () => {
    expect(max({ a: 1, b: 2, c: 3 })).toStrictEqual(3);
    expect(max({ a: 9, b: 2, c: 3 })).toStrictEqual(9);
  });
  it('works with fake props', () => {
    expect(max(OBJ_ARRAY, (a) => a.lol)).toStrictEqual(-Infinity);
    expect(max(OBJ_ARRAY, (a) => a[undefined])).toStrictEqual(-Infinity);
    expect(max(OBJ_ARRAY, (a) => a)).toStrictEqual(-Infinity);
  });
});
