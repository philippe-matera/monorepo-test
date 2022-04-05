const {isNaN} = require("../objects")

describe("isNaN", () => {
  it("works with undefined as list", () => {
    expect(isNaN(undefined)).toStrictEqual(false)
    expect(isNaN(null)).toStrictEqual(false)
    expect(isNaN(false)).toStrictEqual(false)
    expect(isNaN()).toStrictEqual(false)
  })
  it("Works on basic cases", () => {
    expect(isNaN([1, 1])).toStrictEqual(false)
    expect(isNaN([undefined])).toStrictEqual(false)
    expect(isNaN(NaN)).toStrictEqual(true)
    expect(isNaN([NaN])).toStrictEqual(false)
    expect(isNaN({a: NaN})).toStrictEqual(false)
  })
})
