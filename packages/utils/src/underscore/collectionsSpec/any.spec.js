const { any } = require('../collections');

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
const OBJ_LIST = {
  id: 0,
  name: 'Testerino',
  key: undefined,
  foo: 'bar',
  function: () => {},
};

describe('any', () => {
  it('works with function as predicate', () => {
    expect(any(INT_ARRAY, (num) => num % 2 === 0)).toStrictEqual(true);
    expect(any(INT_ARRAY, (num) => num % 2 === 1)).toStrictEqual(true);
    expect(any(INT_ARRAY, (num) => num % 11 === 0)).toStrictEqual(false);
  });
  it('works with Object as predicate', () => {
    expect(any(OBJ_ARRAY, { id: 2 })).toStrictEqual(true);
    expect(any(OBJ_ARRAY, { id: 0 })).toStrictEqual(false);
    expect(any(OBJ_ARRAY, { name: 'Daniel' })).toStrictEqual(true);
    expect(any(OBJ_ARRAY, { name: 'DanieSl' })).toStrictEqual(false);
  });
  it('works with String/Number as predicate', () => {
    expect(any(INT_ARRAY, 2)).toStrictEqual(true);
    expect(any(INT_ARRAY, -1)).toStrictEqual(true);
    expect(any(INT_ARRAY, 20)).toStrictEqual(false);
    expect(any(INT_ARRAY, 0)).toStrictEqual(false);
    expect(any(OBJ_ARRAY, 'name')).toStrictEqual(true);
  });
  it('works with Null as predicate', () => {
    expect(any(INT_ARRAY)).toStrictEqual(true);
    expect(any(OBJ_ARRAY)).toStrictEqual(true);
  });
  it('works with Null as obh', () => {
    expect(any(null)).toStrictEqual(false);
    expect(any(null)).toStrictEqual(false);
  });
  it('works with Null as list', () => {
    expect(any(undefined)).toStrictEqual(false);
    expect(any(undefined, '')).toStrictEqual(false);
    expect(any(undefined, () => {})).toStrictEqual(false);
    expect(any(undefined, {})).toStrictEqual(false);
  });
  it('Works on object', () => {
    expect(any(OBJ_LIST, 'id')).toStrictEqual(false);
    expect(any(OBJ_LIST, 0)).toStrictEqual(true);
    expect(any(OBJ_LIST, 'bar')).toStrictEqual(true);
    expect(any(OBJ_LIST)).toStrictEqual(true);
    expect(any(OBJ_LIST, (v) => v === undefined)).toStrictEqual(true);
    expect(any(OBJ_LIST, (v) => v === 'bar')).toStrictEqual(true);
    expect(any(OBJ_LIST, (v) => v === (() => {}))).toStrictEqual(false);
    expect(any(OBJ_LIST, (v) => typeof v === 'function')).toStrictEqual(true);
  });
});
