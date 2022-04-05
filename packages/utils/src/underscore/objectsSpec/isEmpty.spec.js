const {isEmpty} = require("../objects")

describe("isEmpty", () => {
  it("works with undefined as list", () => {
    expect(isEmpty(undefined)).toStrictEqual(true)
  })
  it("Works on basic cases", () => {
    expect(isEmpty({a: 10})).toStrictEqual(false)
    expect(isEmpty({a: 10, b: "ll"})).toStrictEqual(false)
    expect(isEmpty({a: undefined})).toStrictEqual(false)
    expect(isEmpty({})).toStrictEqual(true)
    expect(isEmpty([])).toStrictEqual(true)
    expect(isEmpty("")).toStrictEqual(true)
    expect(isEmpty("aze")).toStrictEqual(false)
    expect(isEmpty([1, 1])).toStrictEqual(false)
    expect(isEmpty([undefined])).toStrictEqual(false)
  })
  it("Works on practical cases", () => {
    expect(isEmpty([[[[[]]]]])).toStrictEqual(false)
    expect(isEmpty({a: {}})).toStrictEqual(false)
  })
})
