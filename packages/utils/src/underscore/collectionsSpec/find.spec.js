const {find} = require("../collections")

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

describe("find", () => {
  it("works with function as predicate", () => {
    expect(find(INT_ARRAY, (num) => num % 2 === 0)).toStrictEqual(0)
    expect(find(INT_ARRAY, (num) => num === 4)).toStrictEqual(4)
    expect(find(INT_ARRAY, (num) => num === 100)).toStrictEqual(undefined)
    expect(find(INT_ARRAY, (num) => num < 0)).toStrictEqual(undefined)
  })
  it("works with Object as predicate", () => {
    expect(find(OBJ_ARRAY, {id: 2})).toStrictEqual({
      name: "Jean",
      id: 2,
    })
    expect(find(OBJ_ARRAY, {id: 0})).toStrictEqual(undefined)
    expect(find(OBJ_ARRAY, {id: -0})).toStrictEqual(undefined)
    expect(find(OBJ_ARRAY, {id: -1})).toStrictEqual(undefined)
    expect(find(OBJ_ARRAY, {id: 3})).toStrictEqual({id: 3, name: "Bob"})
    expect(find(OBJ_ARRAY, {name: "Bob"})).toStrictEqual({id: 3, name: "Bob"})
    expect(find(OBJ_ARRAY, {name: "ssss"})).toStrictEqual(undefined)
    expect(find(OBJ_ARRAY, {name: "JJean"})).toStrictEqual(undefined)
    expect(find(OBJ_ARRAY, {name: "jean"})).toStrictEqual(undefined)
  })
  it("works with String/Number as predicate", () => {
    expect(find(INT_ARRAY, 2)).toStrictEqual(2)
    expect(find(OBJ_ARRAY, "name")).toStrictEqual({id: 3, name: "Bob"})
  })
  it("works with Null as predicate", () => {
    expect(find(OBJ_ARRAY, {id: null})).toStrictEqual(undefined)
    expect(find(OBJ_ARRAY, {id: undefined})).toStrictEqual(undefined)
    expect(find(OBJ_ARRAY, {})).toStrictEqual({id: 3, name: "Bob"})
    expect(find(INT_ARRAY)).toStrictEqual(1)
    expect(find(OBJ_ARRAY)).toStrictEqual({id: 3, name: "Bob"})
  })
  it("works with Null as list", () => {
    expect(find(undefined)).toStrictEqual(undefined)
    expect(find(undefined, "")).toStrictEqual(undefined)
    expect(find(undefined, () => {})).toStrictEqual(undefined)
    expect(find(undefined, {})).toStrictEqual(undefined)
  })
  it("works with Null as list", () => {
    expect(find(null)).toStrictEqual(undefined)
    expect(find(null, "")).toStrictEqual(undefined)
    expect(find(null, () => {})).toStrictEqual(undefined)
    expect(find(null, {})).toStrictEqual(undefined)
  })
  it("works on Objects", () => {
    expect(find({id: 3, name: "jean"}, 3)).toStrictEqual(3)
    expect(find({id: 3, name: "jean"}, "jean")).toStrictEqual("jean")
    expect(find({id: 3, name: "jean"}, "bob")).toStrictEqual(undefined)
  })
})
