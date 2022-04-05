const {zip} = require("../arrays")
const array = [1, 4, , , , null, 0, null, undefined]
const arr1 = [1, 2, 3, 4, 5]
const arr2 = [1, 2, 5, 4, 5]
const str1 = ["oui", "non", "foo", "bar"]
const str2 = ["non", "non", "Bar", "Bar"]

describe("zip", () => {
  it("works with Null as list", () => {
    expect(zip(undefined)).toStrictEqual([])
    expect(zip(undefined, undefined)).toStrictEqual([])
  })
  it("Works on 3 small arrays", () => {
    expect(zip(["moe", "larry", "curly"], [30, 40, 50], [true, false, false])).toStrictEqual([
      ["moe", 30, true],
      ["larry", 40, false],
      ["curly", 50, false],
    ])
    expect(zip([30, 40, 50], ["moe", "larry", "curly"], [true, false, false])).toStrictEqual([
      [30, "moe", true],
      [40, "larry", false],
      [50, "curly", false],
    ])
    expect(zip([true, false, false], ["moe", "larry", "curly"], [30, 40, 50])).toStrictEqual([
      [true, "moe", 30],
      [false, "larry", 40],
      [false, "curly", 50],
    ])
  })
  it("Works with empty arrays", () => {
    expect(zip([], [], [])).toStrictEqual([])
    expect(zip([], [])).toStrictEqual([])
    expect(zip([], [], undefined)).toStrictEqual([])
    expect(zip(undefined, undefined, [])).toStrictEqual([])
  })
  it("works on huge arrays", () => {
    const max = 10_000
    const arr1 = []
    const res = []
    const res2 = []
    const res3 = []
    for (let i = 0; i < max; ++i) {
      arr1[i] = i
      res[i] = [i, i]
      res2[i] = [i, i, i]
      res3[i] = [
        [i, i],
        [i, i],
      ]
    }
    expect(zip(arr1, arr1)).toStrictEqual(res)
    expect(zip(arr1, arr1, arr1)).toStrictEqual(res2)
    expect(zip(res, res)).toStrictEqual(res3)
  })
})
