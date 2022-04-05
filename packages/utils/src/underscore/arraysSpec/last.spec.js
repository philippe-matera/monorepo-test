const {last} = require("../arrays")

describe("last", () => {
  it("works with Null as list", () => {
    expect(last(undefined)).toStrictEqual(undefined)
    expect(last(undefined, "")).toStrictEqual(undefined)
    expect(last(undefined, () => {})).toStrictEqual([])
    expect(last(undefined, {})).toStrictEqual([])
  })
  it("Works on arrays", () => {
    const array = [1, 4, , , , null, 0, null, undefined]
    expect(last(array, 4)).toStrictEqual([null, 0, null, undefined])
    expect(last(array)).toStrictEqual(undefined)
    expect(last(array, 0)).toStrictEqual(undefined)
  })
})
