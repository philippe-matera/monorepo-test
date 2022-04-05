const { indexOf } = require('../arrays');

describe('indexOf', () => {
  it('works with Null as list', () => {
    expect(indexOf(undefined)).toStrictEqual(-1);
    expect(indexOf(undefined, '')).toStrictEqual(-1);
    expect(indexOf(undefined, () => {})).toStrictEqual(-1);
    expect(indexOf(undefined, {})).toStrictEqual(-1);
  });
  it('Works on arrays', () => {
    const array = [1, 4,,,, null, 0, null, undefined];
    expect(indexOf(array, 4)).toStrictEqual(1);
    expect(indexOf(array, 0)).toStrictEqual(6);
  });
  it('Works on arrays', () => {
    const array = [{ name: 'lo', id: 1 }, { id: 8 }, {}, { name: 'x' },,];
    expect(indexOf(array, { name: 'lo' })).toStrictEqual(-1);
    expect(indexOf(array, { name: 'x' })).toStrictEqual(-1);
    expect(indexOf(array, { id: 8 })).toStrictEqual(-1);
    expect(indexOf(array, { id: 1 })).toStrictEqual(-1);
  });
});
