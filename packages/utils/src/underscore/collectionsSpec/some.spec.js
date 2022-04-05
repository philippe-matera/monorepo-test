const { some } = require('../collections');

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

describe('some', () => {
  it('works with function as predicate', () => {
    expect(some(INT_ARRAY, (num) => num % 2 === 0)).toStrictEqual(true);
    expect(some(INT_ARRAY, (num) => num % 2 === 1)).toStrictEqual(true);
    expect(some(INT_ARRAY, (num) => num % 11 === 0)).toStrictEqual(false);
  });
  it('works with Object as predicate', () => {
    expect(some(OBJ_ARRAY, { id: 2 })).toStrictEqual(true);
    expect(some(OBJ_ARRAY, { id: 0 })).toStrictEqual(false);
    expect(some(OBJ_ARRAY, { name: 'Daniel' })).toStrictEqual(true);
    expect(some(OBJ_ARRAY, { name: 'DanieSl' })).toStrictEqual(false);
  });
  it('works with String/Number as predicate', () => {
    expect(some(INT_ARRAY, 2)).toStrictEqual(true);
    expect(some(INT_ARRAY, -1)).toStrictEqual(true);
    expect(some(INT_ARRAY, 20)).toStrictEqual(false);
    expect(some(INT_ARRAY, 0)).toStrictEqual(false);
    expect(some(OBJ_ARRAY, 'name')).toStrictEqual(true);
  });
  it('works with Null as predicate', () => {
    expect(some(INT_ARRAY)).toStrictEqual(true);
    expect(some(OBJ_ARRAY)).toStrictEqual(true);
  });
  it('works with Null as list', () => {
    expect(some(undefined)).toStrictEqual(false);
    expect(some(undefined, '')).toStrictEqual(false);
    expect(some(undefined, () => {})).toStrictEqual(false);
    expect(some(undefined, {})).toStrictEqual(false);
  });
});
