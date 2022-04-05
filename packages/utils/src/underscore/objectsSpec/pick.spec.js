const {pick} = require("../objects")

describe("pick", () => {
  it("works with undefined as list", () => {
    expect(pick(undefined)).toStrictEqual({})
    expect(pick({})).toStrictEqual({})
    expect(pick()).toStrictEqual({})
  })
  it("Works on basic cases", () => {
    expect(pick({name: "moe", age: 50, userid: "moe1"}, "name")).toStrictEqual({name: "moe"})
    expect(pick({name: "moe", age: 50, userid: "moe1"}, "name", "age")).toStrictEqual({name: "moe", age: 50})
    expect(pick({name: "moe", age: 50, userid: "moe1"}, ["age", "userid"])).toStrictEqual({age: 50, userid: "moe1"})
    expect(pick({name: "moe", age: 50, userid: "moe1"}, ["userid", "age"])).toStrictEqual({age: 50, userid: "moe1"})
    expect(pick({name: "moe", age: 50, userid: "moe1"}, ["name", "userid", "age"])).toStrictEqual({name: "moe", age: 50, userid: "moe1"})
    expect(pick({name: "moe", age: 50, userid: "moe1"}, ["name", "userid", "age", "lol"])).toStrictEqual({name: "moe", age: 50, userid: "moe1"})
    expect(pick({name: "moe", age: 50, userid: "moe1"}, ["name", "userid", "age", ""])).toStrictEqual({name: "moe", age: 50, userid: "moe1"})
    expect(pick({name: "moe", age: 50, userid: "moe1"}, ["name", "userid", "age", undefined])).toStrictEqual({name: "moe", age: 50, userid: "moe1"})
    expect(pick({name: "moe", age: 50, userid: "moe1"}, (v) => typeof v === "number")).toStrictEqual({age: 50})
  })
})
