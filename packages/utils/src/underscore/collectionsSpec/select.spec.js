const { select } = require('../collections');

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
const OBJ_LIST = {
  id: 0,
  name: 'Testerino',
  key: undefined,
  foo: 'bar',
};

describe('select', () => {
  it('works with function as predicate', () => {
    expect(select(INT_ARRAY, (num) => num % 2 === 0)).toStrictEqual([0, 2, 4, 6, 8, 10]);
  });
  it('works with Object as predicate', () => {
    expect(select(OBJ_ARRAY, { id: 2 })).toStrictEqual([{
      name: 'Jean',
      id: 2,
    }]);
  });
  it('works with String/Number as predicate', () => {
    expect(select(INT_ARRAY, 2)).toStrictEqual([2]);
    expect(select(OBJ_ARRAY, 'name')).toStrictEqual(OBJ_ARRAY);
  });
  it('works with Null as predicate', () => {
    expect(select(INT_ARRAY)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(select(OBJ_ARRAY)).toStrictEqual(OBJ_ARRAY);
  });
  it('works with Null as list', () => {
    expect(select(undefined)).toStrictEqual([]);
    expect(select(undefined, '')).toStrictEqual([]);
    expect(select(undefined, () => {})).toStrictEqual([]);
    expect(select(undefined, {})).toStrictEqual([]);
  });
  it('works with objects', () => {
    expect(select(OBJ_LIST, 'name')).toStrictEqual([]);
    expect(select(OBJ_LIST, 0)).toStrictEqual([0]);
    expect(select(OBJ_LIST, 'bar')).toStrictEqual(['bar']);
  });
});
