const { compact } = require('../arrays');

const array = [1, 4,,,, null, 0, null, undefined];

describe('compact', () => {
  it('works with Null as list', () => {
    expect(compact(undefined)).toStrictEqual([]);
    expect(compact(undefined, '')).toStrictEqual([]);
    expect(compact(undefined, () => {})).toStrictEqual([]);
    expect(compact(undefined, {})).toStrictEqual([]);
  });
  it('Works on arrays', () => {
    expect(compact(array)).toStrictEqual([1, 4]);
  });
});
