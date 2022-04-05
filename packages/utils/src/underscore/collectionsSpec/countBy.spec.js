const {countBy} = require("../collections")

const INT_ARRAY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const OBJ_ARRAY = [
  {
    name: "Bob",
    id: 3,
  },
  {
    name: "Jean",
    id: 2,
  },
  {
    name: "Jacques",
    id: 1,
  },
  {
    name: "Hubert",
    id: 5,
  },
  {
    name: "Daniel",
    id: 4,
  },
]
describe("countBy", () => {
  it("is stable", () => {
    countBy(INT_ARRAY, (num) => num % 2 === 0)
    countBy(OBJ_ARRAY, (obj) => obj.id % 2 === 0)
    expect(INT_ARRAY).toStrictEqual(INT_ARRAY)
    expect(OBJ_ARRAY).toStrictEqual(OBJ_ARRAY)
  })
  describe("Objects", () => {
    it("works on values", () => {
      expect(countBy({a: "one", b: "two", c: "three"}, "length")).toStrictEqual({3: 2, 5: 1})
    })
  })
  describe("Arrays", () => {
    it("works with Undefined and falsy values", () => {
      expect(countBy(undefined, (num) => num)).toStrictEqual({})
      expect(countBy(undefined, undefined)).toStrictEqual({})
      expect(countBy([1, 2, 3], undefined)).toStrictEqual({undefined: 3})
      expect(countBy([1, 2, 3], () => {})).toStrictEqual({undefined: 3})
      expect(countBy([], undefined)).toStrictEqual({})
    })
    describe("String as iteratee", () => {
      it("works with Basic case", () => {
        expect(countBy(["one", "two", "three"], "length")).toStrictEqual({3: 2, 5: 1})
        expect(countBy([{id: 1}, {id: 1}, {id: 4}], "id")).toStrictEqual({1: 2, 4: 1})
      })
      it("works with Falsy / empty values", () => {
        expect(countBy(["one", "", "three"], "length")).toStrictEqual({0: 1, 3: 1, 5: 1})
        expect(countBy([null, undefined], "length")).toStrictEqual({false: 2})
        expect(countBy(["one", "", "", "", "three"], "length")).toStrictEqual({0: 3, 3: 1, 5: 1})
      })
      it("keeps order consistent", () => {
        expect(countBy(["one", "one", "one", "neo", "one"], "length")).toStrictEqual({3: 5})
      })
    })
    describe("Function as iteratee", () => {
      it("counts by integers", () => {
        expect(countBy([1.3, 2.1, 2.4], (num) => Math.floor(num))).toStrictEqual({1: 1, 2: 2})
        expect(countBy(INT_ARRAY, (num) => num)).toStrictEqual({
          0: 1,
          1: 1,
          2: 1,
          3: 1,
          4: 1,
          5: 1,
          6: 1,
          7: 1,
          8: 1,
          9: 1,
          10: 1,
        })
      })
      it("counts by booleans", () => {
        expect(countBy(INT_ARRAY, (num) => num % 2 === 0)).toStrictEqual({true: 6, false: 5})
      })
      it("works on empty array", () => {
        expect(countBy([], (num) => num)).toStrictEqual({})
      })
      it("counts on object key value", () => {
        expect(countBy(OBJ_ARRAY, (obj) => obj.id)).toStrictEqual({
          1: 1,
          2: 1,
          3: 1,
          4: 1,
          5: 1,
        })
      })
    })
  })
})
