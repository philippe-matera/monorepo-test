const {difference} = require("../arrays")
const array = [1, 4, , , , null, 0, null, undefined]
const arr1 = [1, 2, 3, 4, 5]
const arr2 = [1, 2, 5, 4, 5]
const str1 = ["oui", "non", "foo", "bar"]
const str2 = ["non", "non", "Bar", "Bar"]

describe("difference", () => {
  it("works with Null as list", () => {
    expect(difference(undefined)).toStrictEqual([])
    expect(difference(undefined, undefined)).toStrictEqual([])
  })
  it("Works on arrays of int", () => {
    expect(difference(arr1, arr2)).toStrictEqual([3])
    expect(difference(arr1, [1])).toStrictEqual([2, 3, 4, 5])
    expect(difference(arr2, [1])).toStrictEqual([2, 5, 4, 5])
  })
  it("Works on arrays of str", () => {
    expect(difference(str1, str2)).toStrictEqual(["oui", "foo", "bar"])
    expect(difference(str1, [1])).toStrictEqual(str1)
    expect(difference(str2, ["foo", "bar"])).toStrictEqual(str2)
  })
  it("works with edge cases", () => {
    expect(difference(str1, undefined)).toStrictEqual(str1)
    expect(difference(str2, undefined)).toStrictEqual(str2)
    expect(difference(arr1, [])).toStrictEqual(arr1)
  })
})
