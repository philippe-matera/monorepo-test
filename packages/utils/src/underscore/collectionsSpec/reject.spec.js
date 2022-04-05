const { reject } = require('../collections');

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
};

describe('reject', () => {
  it('works with function as predicate', () => {
    expect(reject(INT_ARRAY, (num) => num % 2 === 0)).toStrictEqual([-1, 1, 3, 5, 7, 9]);
    expect(reject(INT_ARRAY, (num) => num % 2 === 1)).toStrictEqual([-1, 2, 4, 6, 8, 10]);
    expect(reject(INT_ARRAY, (num) => num % 11 === 0)).toStrictEqual(INT_ARRAY);
  });
  it('works with Object as predicate', () => {
    expect(reject(OBJ_ARRAY, { id: 2 })).toStrictEqual([{ id: 3, name: 'Bob' }, { id: 1, name: 'Jacques' }, { id: 5, name: 'Hubert' }, { id: 4, name: 'Daniel' }]);
    expect(reject(OBJ_ARRAY, { id: 0 })).toStrictEqual(OBJ_ARRAY);
    expect(reject(OBJ_ARRAY, { name: 'Daniel' })).toStrictEqual([{ id: 3, name: 'Bob' }, { id: 2, name: 'Jean' }, { id: 1, name: 'Jacques' }, { id: 5, name: 'Hubert' }]);
    expect(reject(OBJ_ARRAY, { name: 'DanieSl' })).toStrictEqual(OBJ_ARRAY);
  });
  it('works with String/Number as predicate', () => {
    expect(reject(INT_ARRAY, 2)).toStrictEqual([-1, 1, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(reject(INT_ARRAY, -1)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(reject(INT_ARRAY, 20)).toStrictEqual(INT_ARRAY);
    expect(reject(INT_ARRAY, 0)).toStrictEqual(INT_ARRAY);
    expect(reject(OBJ_ARRAY, 'name')).toStrictEqual([]);
    expect(reject([...OBJ_ARRAY, { id: 9 }], 'name')).toStrictEqual([{ id: 9 }]);
  });
  it('works with Null as predicate', () => {
    expect(reject(INT_ARRAY)).toStrictEqual([]);
    expect(reject(OBJ_ARRAY)).toStrictEqual([]);
  });
  it('works with Null as list', () => {
    expect(reject(undefined)).toStrictEqual([]);
    expect(reject(undefined, '')).toStrictEqual([]);
    expect(reject(undefined, () => {})).toStrictEqual([]);
    expect(reject(undefined, {})).toStrictEqual([]);
  });
  it('Works on object', () => {
    expect(reject(OBJ_LIST, 'id')).toStrictEqual([0, 'Testerino', undefined, 'bar']);
    expect(reject(OBJ_LIST, 0)).toStrictEqual(['Testerino', undefined, 'bar']);
    expect(reject(OBJ_LIST, 'bar')).toStrictEqual([0, 'Testerino', undefined]);
    expect(reject(OBJ_LIST)).toStrictEqual([0, undefined]);
    expect(reject(OBJ_LIST, (v) => v === undefined)).toStrictEqual([0, 'Testerino', 'bar']);
    expect(reject(OBJ_LIST, (v) => v === 'bar')).toStrictEqual([0, 'Testerino', undefined]);
    expect(reject(OBJ_LIST, (v) => v === (() => {}))).toStrictEqual([0, 'Testerino', undefined, 'bar']);
  });
});
