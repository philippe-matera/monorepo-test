const {groupBy} = require("../collections")

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
describe("groupBy", () => {
  it("is stable", () => {
    groupBy(INT_ARRAY, (num) => num % 2 === 0)
    groupBy(OBJ_ARRAY, (obj) => obj.id % 2 === 0)
    expect(INT_ARRAY).toStrictEqual(INT_ARRAY)
    expect(OBJ_ARRAY).toStrictEqual(OBJ_ARRAY)
  })
  describe("Objects", () => {
    it("works on values", () => {
      expect(groupBy({a: "one", b: "two", c: "three"}, "length")).toStrictEqual({3: ["one", "two"], 5: ["three"]})
    })
  })
  describe("Arrays", () => {
    it("works with Undefined and falsy values", () => {
      expect(groupBy(undefined, (num) => num)).toStrictEqual({})
      expect(groupBy(undefined, undefined)).toStrictEqual({})
      expect(groupBy()).toStrictEqual({})
      expect(groupBy([1, 2, 3], undefined)).toStrictEqual({undefined: [1, 2, 3]})
      expect(groupBy([1, 2, 3], () => {})).toStrictEqual({undefined: [1, 2, 3]})
      expect(groupBy([], undefined)).toStrictEqual({})
    })
    describe("String as iteratee", () => {
      it("works with Basic case", () => {
        expect(groupBy(["one", "two", "three"], "length")).toStrictEqual({3: ["one", "two"], 5: ["three"]})
        expect(groupBy([{id: 1}, {id: 1}, {id: 4}], "id")).toStrictEqual({1: [{id: 1}, {id: 1}], 4: [{id: 4}]})
      })
      it("works with Falsy / empty values", () => {
        expect(groupBy(["one", "", "three"], "length")).toStrictEqual({0: [""], 3: ["one"], 5: ["three"]})
        expect(groupBy([null, undefined], "length")).toStrictEqual({false: [null, undefined]})
        expect(groupBy(["one", "", "", "", "three"], "length")).toStrictEqual({0: ["", "", ""], 3: ["one"], 5: ["three"]})
      })
      it("keeps order consistent", () => {
        expect(groupBy(["one", "one", "one", "neo", "one"], "length")).toStrictEqual({3: ["one", "one", "one", "neo", "one"]})
      })
    })
    describe("Function as iteratee", () => {
      it("groups by integers", () => {
        expect(groupBy([1.3, 2.1, 2.4], (num) => Math.floor(num))).toStrictEqual({1: [1.3], 2: [2.1, 2.4]})
        expect(groupBy(INT_ARRAY, (num) => num)).toStrictEqual({
          0: [0],
          1: [1],
          2: [2],
          3: [3],
          4: [4],
          5: [5],
          6: [6],
          7: [7],
          8: [8],
          9: [9],
          10: [10],
        })
      })
      it("groups by booleans", () => {
        expect(groupBy(INT_ARRAY, (num) => num % 2 === 0)).toStrictEqual({true: [0, 2, 4, 6, 8, 10], false: [1, 3, 5, 7, 9]})
      })
      it("works on empty array", () => {
        expect(groupBy([], (num) => num)).toStrictEqual({})
      })
      it("groups on object key value", () => {
        expect(groupBy(OBJ_ARRAY, (obj) => obj.id)).toStrictEqual({
          1: [
            {
              id: 1,
              name: "Jacques",
            },
          ],
          2: [
            {
              id: 2,
              name: "Jean",
            },
          ],
          3: [
            {
              id: 3,
              name: "Bob",
            },
          ],
          4: [
            {
              id: 4,
              name: "Daniel",
            },
          ],
          5: [
            {
              id: 5,
              name: "Hubert",
            },
          ],
        })
      })
    })
  })
})
