const {get} = require("../objects")

describe("get", () => {
  it("works with Null as list", () => {
    expect(get(undefined)).toStrictEqual(undefined)
    expect(get(undefined, "")).toStrictEqual(undefined)
    expect(get(undefined, () => {})).toStrictEqual(undefined)
    expect(get(undefined, {})).toStrictEqual(undefined)
  })
  it("Works on basic cases", () => {
    expect(get({a: 10}, "a")).toStrictEqual(10)
    expect(get({a: 10}, "b", 100)).toStrictEqual(100)
    expect(get({a: 10}, "b")).toStrictEqual(undefined)
    expect(get("b", "b")).toStrictEqual(undefined)
    expect(get({a: 10}, undefined, 100)).toStrictEqual(100)
  })
  it("Works on practical cases", () => {
    expect(get({a: [{b: 2}]}, ["a", 0, "b"])).toStrictEqual(2)
    expect(get({a: [{b: 2}]}, ["a", 0, "b"])).toStrictEqual(2)
    expect(get({a: [{b: 2}]}, ["a", 0, "b"])).toStrictEqual(2)
    expect(get({a: [{b: 2}]}, "a[0].b")).toStrictEqual(2)
    expect(get({a: [{b: 2}]}, "a[0].b")).toStrictEqual(2)
    expect(get({a: {b: {c: {d: "lol"}}}}, "a.b.c.d")).toStrictEqual("lol")
    expect(get({a: {b: {c: {d: "lol"}}}}, "a.b.c")).toStrictEqual({d: "lol"})
    expect(get({a: {b: {c: {d: "lol"}}}}, "a.b")).toStrictEqual({c: {d: "lol"}})
  })
})
