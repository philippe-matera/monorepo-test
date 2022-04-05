const { where } = require('../collections');

const OBJ_ARRAY = [
  {
    name: 'Bob',
    id: 3,
    bool: false,
  },
  {
    name: 'Jean',
    id: 2,
    bool: true,
  },
  {
    name: 'Jacques',
    id: 1,
    bool: true,
  },
  {
    name: 'Hubert',
    id: 5,
    bool: false,
  },
  {
    name: 'Daniel',
    id: 4,
    bool: true,
    object: {
      test: 'lol',
      MAYO: undefined,
    },
  },
];

describe('where', () => {
  it('works with Object as predicate', () => {
    expect(where(OBJ_ARRAY, { id: 2 })).toStrictEqual([{
      name: 'Jean',
      id: 2,
      bool: true,
    }]);
    expect(where(OBJ_ARRAY, { id: 0 })).toStrictEqual([]);
    expect(where(OBJ_ARRAY, { id: -0 })).toStrictEqual([]);
    expect(where(OBJ_ARRAY, { id: -1 })).toStrictEqual([]);
    expect(where(OBJ_ARRAY, { id: 3 })).toStrictEqual([{ id: 3, name: 'Bob', bool: false }]);
    expect(where(OBJ_ARRAY, { name: 'Bob' })).toStrictEqual([{ id: 3, name: 'Bob', bool: false }]);
    expect(where(OBJ_ARRAY, { name: 'ssss' })).toStrictEqual([]);
    expect(where(OBJ_ARRAY, { name: 'JJean' })).toStrictEqual([]);
    expect(where(OBJ_ARRAY, { name: 'jean' })).toStrictEqual([]);
    expect(where(OBJ_ARRAY, { bool: false })).toStrictEqual([{
      name: 'Bob',
      id: 3,
      bool: false,
    }, {
      name: 'Hubert',
      id: 5,
      bool: false,
    }]);
  });
  it('works with subset of Object as predicate', () => {
    expect(where(OBJ_ARRAY, { object: { test: 'lol' } })).toStrictEqual([{
      name: 'Daniel',
      id: 4,
      bool: true,
      object: {
        test: 'lol',
        MAYO: undefined,
      },
    }]);
  });
  it('works with undefined as list', () => {
    expect(where(undefined)).toStrictEqual([]);
    expect(where(undefined, '')).toStrictEqual([]);
    expect(where(undefined, () => {})).toStrictEqual([]);
    expect(where(undefined, {})).toStrictEqual([]);
  });
  it('works with Null as list', () => {
    expect(where(null)).toStrictEqual([]);
    expect(where(null, '')).toStrictEqual([]);
    expect(where(null, () => {})).toStrictEqual([]);
    expect(where(null, {})).toStrictEqual([]);
  });
});
