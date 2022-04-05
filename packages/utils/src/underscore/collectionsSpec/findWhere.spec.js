const { findWhere } = require('../collections');

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
    object: {
      test: 'lol',
      MAYO: undefined,
    },
  },
];

describe('findWhere', () => {
  it('works with Object as predicate', () => {
    expect(findWhere(OBJ_ARRAY, { id: 2 })).toStrictEqual({
      name: 'Jean',
      id: 2,
    });
    expect(findWhere(OBJ_ARRAY, { id: 0 })).toStrictEqual(undefined);
    expect(findWhere(OBJ_ARRAY, { id: -0 })).toStrictEqual(undefined);
    expect(findWhere(OBJ_ARRAY, { id: -1 })).toStrictEqual(undefined);
    expect(findWhere(OBJ_ARRAY, { id: 3 })).toStrictEqual({ id: 3, name: 'Bob' });
    expect(findWhere(OBJ_ARRAY, { name: 'Bob' })).toStrictEqual({ id: 3, name: 'Bob' });
    expect(findWhere(OBJ_ARRAY, { name: 'ssss' })).toStrictEqual(undefined);
    expect(findWhere(OBJ_ARRAY, { name: 'JJean' })).toStrictEqual(undefined);
    expect(findWhere(OBJ_ARRAY, { name: 'jean' })).toStrictEqual(undefined);
  });
  it('works with subset of Object as predicate', () => {
    expect(findWhere(OBJ_ARRAY, { object: { test: 'lol' } })).toStrictEqual({
      name: 'Daniel',
      id: 4,
      object: {
        test: 'lol',
        MAYO: undefined,
      },
    });
  });
  it('works with undefined as list', () => {
    expect(findWhere(undefined)).toStrictEqual(undefined);
    expect(findWhere(undefined, '')).toStrictEqual(undefined);
    expect(findWhere(undefined, () => {})).toStrictEqual(undefined);
    expect(findWhere(undefined, {})).toStrictEqual(undefined);
  });
  it('works with Null as list', () => {
    expect(findWhere(null)).toStrictEqual(undefined);
    expect(findWhere(null, '')).toStrictEqual(undefined);
    expect(findWhere(null, () => {})).toStrictEqual(undefined);
    expect(findWhere(null, {})).toStrictEqual(undefined);
  });
});
