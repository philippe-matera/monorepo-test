const {omit} = require("../objects")

describe("omit", () => {
  it("works with undefined as list", () => {
    expect(omit(undefined)).toStrictEqual({})
    expect(omit({})).toStrictEqual({})
    expect(omit()).toStrictEqual({})
  })
  it("Works on basic cases", () => {
    expect(omit({name: "moe", age: 50, userid: "moe1"}, "userid")).toStrictEqual({name: "moe", age: 50})
    expect(omit({name: "moe", age: 50, userid: "moe1"}, "userid", "age")).toStrictEqual({name: "moe"})
    expect(omit({name: "moe", age: 50, userid: "moe1"}, ["age", "userid"])).toStrictEqual({name: "moe"})
    expect(omit({name: "moe", age: 50, userid: "moe1"}, ["userid", "age"])).toStrictEqual({name: "moe"})
    expect(omit({name: "moe", age: 50, userid: "moe1"}, ["name", "userid", "age"])).toStrictEqual({})
    expect(omit({name: "moe", age: 50, userid: "moe1"}, ["name", "userid", "age", "lol"])).toStrictEqual({})
    expect(omit({name: "moe", age: 50, userid: "moe1"}, ["name", "userid", "age", ""])).toStrictEqual({})
    expect(omit({name: "moe", age: 50, userid: "moe1"}, ["name", "userid", "age", undefined])).toStrictEqual({})
    expect(omit({name: "moe", age: 50, userid: "moe1"}, (v) => typeof v === "number")).toStrictEqual({name: "moe", userid: "moe1"})
  })
})
