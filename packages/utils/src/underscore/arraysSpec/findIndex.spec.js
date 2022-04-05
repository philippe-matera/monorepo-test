const { findIndex } = require('../arrays');

describe('findIndex', () => {
  it('works with Null as list', () => {
    expect(findIndex(undefined)).toStrictEqual(-1);
    expect(findIndex(undefined, '')).toStrictEqual(-1);
    expect(findIndex(undefined, () => {})).toStrictEqual(-1);
    expect(findIndex(undefined, {})).toStrictEqual(-1);
  });
  it('Works on arrays', () => {
    const array = [1, 4,,,, null, 0, null, undefined];
    expect(findIndex(array, 4)).toStrictEqual(1);
    expect(findIndex(array, 0)).toStrictEqual(6);
  });
  it('Works on arrays', () => {
    const array = [{ name: 'lo', id: 1 }, { id: 8 }, {}, { name: 'x' },,];
    expect(findIndex(array, { name: 'lo' })).toStrictEqual(0);
    expect(findIndex(array, { name: 'x' })).toStrictEqual(3);
    expect(findIndex(array, { id: 8 })).toStrictEqual(1);
    expect(findIndex(array, { id: 1 })).toStrictEqual(0);
  });
});
