const {each} = require("../collections")

const INT_ARRAY = [0, 1, 2, 3, 4]
const OBJ_LIST = {
  id: 0,
  name: "Testerino",
  key: undefined,
  foo: "bar",
}

describe("each", () => {
  it("works with function as predicate", () => {
    const res = []
    const index = []
    each(INT_ARRAY, (num) => {
      if (num % 2 === 0) res.push(num)
    })
    expect(INT_ARRAY).toStrictEqual(INT_ARRAY)
    each(INT_ARRAY, (_, i) => {
      index.push(i)
    })
    expect(res).toStrictEqual([0, 2, 4])
    expect(index).toStrictEqual(INT_ARRAY)
  })

  it("Works on object", () => {
    const res = []
    const index = []
    each(OBJ_LIST, (ent, i) => {
      res.push(ent)
      index.push(i)
    })
    expect(res).toStrictEqual([0, "Testerino", undefined, "bar"])
    expect(index).toStrictEqual(["id", "name", "key", "foo"])
  })
  
  it("works with undefined", () => {
    const res = null
    each(res)
    expect(res).toStrictEqual(null)
    each(res, () => {})
    expect(res).toStrictEqual(null)
  })
  it("works with undefined", () => {
    const res = undefined
    each(res)
    expect(res).toStrictEqual(undefined)
    each(res, () => {})
    expect(res).toStrictEqual(undefined)
  })
})
