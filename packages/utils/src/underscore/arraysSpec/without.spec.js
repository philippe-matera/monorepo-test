const {without} = require("../arrays")
const array = [1, 4, , , , null, 0, null, undefined]
const arr1 = [1, 2, 3, 4, 5]
const arr2 = [1, 2, 5, 4, 5]
const str1 = ["oui", "non", "foo", "bar"]
const str2 = ["non", "non", "Bar", "Bar"]

describe("without", () => {
  it("works with Null as list", () => {
    expect(without(undefined)).toStrictEqual([])
    expect(without(undefined, undefined)).toStrictEqual([])
  })
  it("Works on arrays of int", () => {
    expect(without(arr1, ...arr2)).toStrictEqual([3])
    expect(without(arr1, ...[1])).toStrictEqual([2, 3, 4, 5])
    expect(without(arr2, ...[1])).toStrictEqual([2, 5, 4, 5])
  })
  it("Works on arrays of str", () => {
    expect(without(str1, ...str2)).toStrictEqual(["oui", "foo", "bar"])
    expect(without(str1, ...[1])).toStrictEqual(str1)
    expect(without(str2, ...["foo", "bar"])).toStrictEqual(str2)
  })
  it("works with edge cases", () => {
    expect(without(str1, undefined)).toStrictEqual(str1)
    expect(without(str2, undefined)).toStrictEqual(str2)
    expect(without(arr1, null)).toStrictEqual(arr1)
    expect(without(arr1, ...[])).toStrictEqual(arr1)
  })
})
