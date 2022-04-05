const {object} = require("../arrays")

describe("object", () => {
  it("works with Null as list", () => {
    expect(object(undefined)).toStrictEqual({})
    expect(object(undefined, "")).toStrictEqual({})
    expect(object(undefined, () => {})).toStrictEqual({})
    expect(object(undefined, {})).toStrictEqual({})
  })
  it("Works on one argument", () => {
    const obj_array = [
      ["moe", 30],
      ["larry", 40],
      ["curly", 50],
    ]
    expect(object(obj_array)).toStrictEqual({moe: 30, larry: 40, curly: 50})
  })
  it("Works on with two args", () => {
    const str_array = ["moe", "larry", "curly"]
    const values = [30, 40, 50]
    expect(object(str_array, values)).toStrictEqual({moe: 30, larry: 40, curly: 50})
  })
  it("Handle random cases", () => {
    const str_array = ["moe", "larry", "curly"]
    const values = [30, 40, 50]
    expect(object(str_array, str_array)).toStrictEqual({moe: "moe", larry: "larry", curly: "curly"})
    expect(object(str_array, values.concat(values))).toStrictEqual({moe: 30, larry: 40, curly: 50})
    expect(object(str_array, values.concat([50, 40, 30]))).toStrictEqual({moe: 30, larry: 40, curly: 50})
    expect(object(str_array.concat(str_array), values)).toStrictEqual({moe: undefined, larry: undefined, curly: undefined})
  })
})
