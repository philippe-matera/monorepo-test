const { flatten } = require('../arrays');

const INT_ARRAY = [[1, 2], 3, [4, 5, 6]];
const OBJ_ARRAY = [
  [[{
    name: 'Bob',
    id: 3,
  }]],
  {
    name: 'Jean',
    id: 2,
  },
  [{
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
  }],
];

describe('flatten', () => {
  it('works with Null as list', () => {
    expect(flatten(undefined)).toStrictEqual([]);
    expect(flatten(undefined, '')).toStrictEqual([]);
    expect(flatten(undefined, () => {})).toStrictEqual([]);
    expect(flatten(undefined, {})).toStrictEqual([]);
  });
  it('Works on arrays', () => {
    expect(flatten(INT_ARRAY)).toStrictEqual([1, 2, 3, 4, 5, 6]);
    expect(flatten(OBJ_ARRAY)).toStrictEqual([[{
      id: 3,
      name: 'Bob',
    }],
    {
      id: 2,
      name: 'Jean',
    },
    {
      id: 1,
      name: 'Jacques',
    },
    {
      id: 5,
      name: 'Hubert',
    },
    {
      id: 4,
      name: 'Daniel',
    }]);
    expect(flatten(OBJ_ARRAY, 10)).toStrictEqual([{
      id: 3,
      name: 'Bob',
    },
    {
      id: 2,
      name: 'Jean',
    },
    {
      id: 1,
      name: 'Jacques',
    },
    {
      id: 5,
      name: 'Hubert',
    },
    {
      id: 4,
      name: 'Daniel',
    }]);
    expect(flatten([1, 2, 3, 4])).toStrictEqual([1, 2, 3, 4]);
  });
});
