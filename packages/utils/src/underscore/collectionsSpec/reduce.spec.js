const { reduce } = require('../collections');

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
describe('reduce', () => {
  it('is stable', () => {
    reduce(INT_ARRAY, (_memo, num) => num % 2 === 0);
    reduce(OBJ_ARRAY, (_memo, obj) => obj.id % 2 === 0);
    expect(INT_ARRAY).toStrictEqual(INT_ARRAY);
    expect(OBJ_ARRAY).toStrictEqual(OBJ_ARRAY);
  });
  describe('Arrays', () => {
    it('works with Undefined and falsy values', () => {
      expect(reduce(undefined, (num) => num)).toStrictEqual(undefined);
      expect(reduce(undefined, undefined)).toStrictEqual(undefined);
      expect(reduce([1, 2, 3], undefined)).toStrictEqual(undefined);
      expect(reduce([1, 2, 3], () => {})).toStrictEqual(undefined);
      expect(reduce([], undefined)).toStrictEqual(undefined);
    });
    it('works with Basic case', () => {
      expect(reduce([1, 2, 3], (memo, num) => memo + num, 0)).toStrictEqual(6);
    });
    it('depends on memo value', () => {
      expect(reduce([1, 2, 3], (memo, num) => memo + num, 10)).toStrictEqual(16);
      expect(reduce([1, 2, 3], (memo, num) => memo + num, -6)).toStrictEqual(0);
    });
    it('works with Falsy / empty values', () => {
      expect(reduce([null, undefined], (memo, num) => memo + num)).toStrictEqual(NaN);
    });
    it('takes the first value as default memo', () => {
      expect(reduce([null, 1, 3, , undefined], (memo, num) => memo + num)).toStrictEqual(NaN);
      expect(reduce([0, 1, 3, , undefined], (memo, num = 0) => memo + num)).toStrictEqual(4);
    });
  });
  describe('Objects', () => {
    it('works with Basic case', () => {
      expect(reduce({ id: 1, name: 'bob' }, (memo, num) => memo + num, 0)).toStrictEqual('1bob');
    });
  });
});
