const { min } = require('../collections');

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

describe('min', () => {
  it('works without predicate', () => {
    expect(min(INT_ARRAY)).toStrictEqual(-1);
    expect(min([9, 8, 8, 2, 1])).toStrictEqual(1);
  });
  it('works with function as predicate', () => {
    expect(min(INT_ARRAY, (a, b) => a > b)).toStrictEqual(-1);
    expect(min(OBJ_ARRAY, (a) => a.id)).toStrictEqual({ id: 1, name: 'Jacques' });
  });
  it('works on Objects', () => {
    expect(min({ a: 1, b: 2, c: 3 })).toStrictEqual(1);
    expect(min({ a: 9, b: 2, c: 3 })).toStrictEqual(2);
  });
  it('works with fake props', () => {
    expect(min(OBJ_ARRAY, (a) => a.lol)).toStrictEqual(Infinity);
    expect(min(OBJ_ARRAY, (a) => a[undefined])).toStrictEqual(Infinity);
    expect(min(OBJ_ARRAY, (a) => a)).toStrictEqual(Infinity);
  });
});
