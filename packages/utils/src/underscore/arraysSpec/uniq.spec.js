const {uniq} = require("../arrays")

describe("uniq", () => {
  it("works with Null as list", () => {
    expect(uniq(undefined)).toStrictEqual([])
    expect(uniq(undefined, "")).toStrictEqual([])
    expect(uniq(undefined, () => {})).toStrictEqual([])
    expect(uniq(undefined, {})).toStrictEqual([])
  })
  it("Works on arrays", () => {
    const int_array = [11, 2, 3, 11, 3, 2, 4]
    expect(uniq(int_array)).toStrictEqual([11, 2, 3, 4])
  })
  it("Works on arrays of objects", () => {
    const array = [{name: "lo", id: 1}, {id: 8}, {id: 1}, {id: 1}, {name: "x"}, , , , ,]
    const array2 = [{name: "lo", id: 1}, {id: 8}, {id: 1}, {id: 1}, {name: "x"}, , , {name: "x"}, {name: "oui"}]
    expect(uniq(array, (o) => o.id)).toStrictEqual([{name: "lo", id: 1}, {id: 8}, {name: "x"}])
    expect(uniq(array, "id")).toStrictEqual([{name: "lo", id: 1}, {id: 8}, {name: "x"}])
    expect(uniq(array2, (o) => o.name)).toStrictEqual([{name: "lo", id: 1}, {id: 8}, {name: "x"}, {name: "oui"}])
  })
  it("Works on undefineds", () => {
    const array = [{name: "lo", id: 1}, {id: 8}, {id: 1}, {id: 1}, {name: "x"}, , , , ,]
    const array2 = [{name: "lo", id: 1}, {id: 8}, {id: 1}, {id: 1}, {name: "x"}, , , {name: "x"}, {name: "oui"}]
    expect(uniq(array, (o) => o.lol)).toStrictEqual([{name: "lo", id: 1}])
    expect(uniq(array, "poggers")).toStrictEqual([{name: "lo", id: 1}])
    expect(uniq(array2, (o) => undefined)).toStrictEqual([{name: "lo", id: 1}])
  })
  it("Uses fast sorting", () => {
    const array = [{name: "lo", id: 1}, {id: 8}, {id: 1}, {id: 1}, {name: "x"}, , , , ,]
    const array2 = [{name: "lo", id: 1}, {id: 8}, {id: 1}, {id: 1}, {name: "x"}, , , {name: "x"}, {name: "oui"}]
    expect(uniq(array, true, (o) => o.lol)).toStrictEqual([{name: "lo", id: 1}])
    expect(uniq(array, true, "poggers")).toStrictEqual([{name: "lo", id: 1}])
    expect(uniq(array2, false, (o) => undefined)).toStrictEqual([{name: "lo", id: 1}])
  })
})
