const { range } = require('../arrays');

describe('range', () => {
  it('works with Null as list', () => {
    expect(range(undefined)).toStrictEqual([]);
    expect(range(0)).toStrictEqual([]);
  });
  it('Works on arrays', () => {
    expect(range(10)).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(range(1, 11)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(range(0, 30, 5)).toStrictEqual([0, 5, 10, 15, 20, 25]);
    expect(range(0, -10, -1)).toStrictEqual([0, -1, -2, -3, -4, -5, -6, -7, -8, -9]);
  });
});
