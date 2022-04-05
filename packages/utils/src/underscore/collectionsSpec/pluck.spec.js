const {pluck} = require("../collections")

const INT_ARRAY = [-1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
const OBJ_LIST = {
  id: 0,
  name: "Testerino",
  key: undefined,
  foo: "bar",
  function: () => {},
}

describe("pluck", () => {
  it("works with falsy", () => {
    expect(pluck(undefined, "name")).toStrictEqual([])
    expect(pluck(undefined)).toStrictEqual([])
    expect(pluck(null)).toStrictEqual([])
    expect(pluck(null, null)).toStrictEqual([])
  })
  it("works with non objects", () => {
    expect(pluck(INT_ARRAY, "name")).toStrictEqual([])
    expect(pluck(INT_ARRAY, "length")).toStrictEqual([])
  })
  it("works with array of objects", () => {
    expect(pluck(OBJ_ARRAY, "name")).toStrictEqual(["Bob", "Jean", "Jacques", "Hubert", "Daniel"])
    expect(
      pluck(
        [
          {name: "moe", age: 40},
          {name: "larry", age: 50},
          {name: "curly", age: 60},
        ],
        "name",
      ),
    ).toStrictEqual(["moe", "larry", "curly"])
  })
  it("works with objects", () => {
    expect(pluck(OBJ_LIST, "id")).toStrictEqual(0)
    expect(pluck(OBJ_LIST, "name")).toStrictEqual("Testerino")
    expect(pluck(OBJ_LIST, "key")).toStrictEqual(undefined)
    expect(pluck(OBJ_LIST, "lol")).toStrictEqual(undefined)
  })
  it("works when not found", () => {
    expect(pluck(OBJ_ARRAY, "pouet")).toStrictEqual([])
    expect(pluck(OBJ_ARRAY, "xxx")).toStrictEqual([])
  })
  it("works on spreaded arrays", () => {
    expect(
      pluck(
        [
          ["moe", "larry", "curly"],
          [30, 40, 50],
          [true, false, false],
        ],
        "" + 0,
      ),
    ).toStrictEqual(["moe", 30, true])
    expect(
      pluck(
        [
          ["moe", "larry", "curly"],
          [30, 40, 50],
          [true, false, false],
        ],
        "" + 1,
      ),
    ).toStrictEqual(["larry", 40, false])
    expect(
      pluck(
        [
          ["moe", "larry", "curly"],
          [30, 40, 50],
          [true, false, false],
        ],
        "" + 2,
      ),
    ).toStrictEqual(["curly", 50, false])
  })
})
