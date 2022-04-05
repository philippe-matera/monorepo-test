const {first} = require("../arrays")

describe("first", () => {
  it("works with Null as list", () => {
    expect(first(undefined)).toStrictEqual(undefined)
    expect(first(undefined, "")).toStrictEqual(undefined)
    expect(first(undefined, () => {})).toStrictEqual([])
    expect(first(undefined, {})).toStrictEqual([])
  })
  it("Works on arrays", () => {
    const array = [1, 4, , , , null, 0, null, undefined]
    expect(first(array, 4)).toStrictEqual([1, 4, , ,])
    expect(first(array)).toStrictEqual(1)
    expect(first(array, 0)).toStrictEqual(1)
  })
})
