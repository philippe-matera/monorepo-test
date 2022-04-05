const {times} = require("../utils")
const basicFn = (v) => v * v

describe("times", () => {
  it("works with Null as list", () => {
    expect(times(undefined)).toStrictEqual([0])
    expect(times(undefined, () => {})).toStrictEqual([undefined])
  })
  it("Works on basic cases", () => {
    expect(times(1, basicFn)).toStrictEqual([0])
    expect(times(4, basicFn)).toStrictEqual([0, 1, 4, 9])
    expect(times(3, () => {})).toStrictEqual([undefined, undefined, undefined])
  })
})
