const { map } = require('../collections');

const INT_ARRAY = [0, 1, 2, 3, 4];
const OBJ_LIST = {
  id: 0,
  name: 'Testerino',
  key: undefined,
  foo: 'bar',
};

describe('map', () => {
  it('works with function as predicate', () => {
    const res = [];
    map(INT_ARRAY, (num) => { if (num % 2 === 0) res.push(num); });
    expect(res).toStrictEqual([0, 2, 4]);
  });

  it('Works on object', () => {
    const res = [];
    map(OBJ_LIST, (ent) => { res.push(ent); });
    expect(res).toStrictEqual([0, 'Testerino', undefined, 'bar']);
  });
  it('works with falsy', () => {
    const res = [];
    map(undefined, () => {});
    expect(res).toStrictEqual([]);
  });
  it('works with null', () => {
    const res = [];
    map(null, () => {});
    map(null, null);
    map(null, undefined);
    map(null);
    expect(res).toStrictEqual([]);
  });
});
