/**
 * Recursively checks if the subObj is contained within the superObj
 * @param {Object} superObj
 * @param {Object} subObj
 */
const isSubset = (superObj, subObj) => {
  return Object.keys(subObj).every((ele) => {
    if (subObj[ele] instanceof Object) {
      return isSubset(superObj[ele], subObj[ele])
    }
    return superObj && subObj[ele] === superObj[ele]
  })
}

/**
 * An internal function to generate callbacks that can be applied to each
 * element in a collection, returning the desired result — either identity,
 * an arbitrary callback, a property matcher, or a property accessor.
 * @param {*} value
 */
export const baseIteratee = (value) => {
  if (!value && typeof value !== "number") return (obj) => !!obj
  if (typeof value === "function") return value
  if (typeof value === "object" && !Array.isArray(value)) return (object) => isSubset(object, value)
  return (obj) => (obj && typeof obj === "object" ? obj[value] : obj === value)
}

/**
 * Looks through each value in the list, returning an array of all the values that pass a truth test (predicate). predicate is transformed through iteratee to facilitate shorthand syntaxes.
 * @param {Array} list - List iterated over
 * @param {Function} predicate - predicate
 */
export const filter = (list = [], predicate) => (Array.isArray(list) ? list : Object.values(list)).filter(baseIteratee(predicate))
export const select = filter

/**
 * Returns a (stably) sorted copy of list, ranked in ascending order by the results of running each value through iteratee. iteratee may also be the string name of the property to sort by (eg. length). This function uses operator < (note).
 * @param {Array} list
 * @param {Function | string} iteratee
 */
export const sortBy = (list = [], iteratee) =>
  list.concat().sort((a, b) => {
    const val_a = typeof iteratee === "function" ? iteratee(a) : a[iteratee]
    const val_b = typeof iteratee === "function" ? iteratee(b) : b[iteratee]
    return val_a > val_b ? 1 : val_b > val_a ? -1 : 0
  })

/**
 * Returns true if the value is present in the list. Uses indexOf internally, if list is an Array. Checks the values of the Object otherwise.
 * @param {Array | Object} list
 * @param {*} value
 */
export const contains = (list = [], value) => {
  if (Array.isArray(list)) return list.indexOf(value) > -1
  return Object.values(list).indexOf(value) > -1
}
export const includes = contains

/**
 * Splits a collection into sets, grouped by the result of running each value through iteratee. If iteratee is a string instead of a function, groups by the property named by iteratee on each of the values.
 * @param {Array | Object} list
 * @param {Function | String} iteratee
 */
export const groupBy = (list = [], iteratee = () => {}) =>
  (Array.isArray(list) ? list : Object.values(list)).reduce(
    (accumulator, value, _i, _a, key = typeof iteratee === "string" ? value !== null && value !== undefined && value[iteratee] : iteratee(value)) => (
      (accumulator[key] || (accumulator[key] = [])).push(value), accumulator
    ),
    {},
  )

/**
 * Sorts a list into groups and returns a count for the number of objects in each group. Similar to groupBy, but instead of returning a list of values, returns a count for the number of values in that group.
 * @param {Array | Object} list
 * @param {Function | String} iteratee
 */
export const countBy = (list = [], iteratee = () => {}) =>
  (Array.isArray(list) ? list : Object.values(list)).reduce(
    (accumulator, value, _i, _a, key = typeof iteratee === "string" ? value !== null && value !== undefined && value[iteratee] : iteratee(value)) => (
      ++accumulator[key] || (accumulator[key] = 1), accumulator
    ),
    {},
  )

/**
 * reduce boils down a list of values into a single value. Memo is the initial state of the reduction, and each successive step of it should be returned by iteratee. The iteratee is passed four arguments: the memo, then the value and index (or key) of the iteration, and finally a reference to the entire list.
 * @param {Array | Object} list
 * @param {Function} iteratee
 */
export const reduce = (list = [], iteratee = () => {}, memo) => {
  const array = Array.isArray(list) ? list : Object.values(list)
  if (typeof memo === "undefined") memo = array.shift()
  return array.reduce(iteratee, memo)
}

/**
 * Returns true if any of the values in the list pass the predicate truth test. Short-circuits and stops traversing the list if a true element is found. predicate is transformed through iteratee to facilitate shorthand syntaxes.
 * @param {Array | Object} list
 * @param {Function | String} predicate
 */
export const any = (list = {}, predicate) => {
  if (!list) return false
  return (Array.isArray(list) ? list : Object.values(list)).some(baseIteratee(predicate))
}
export const some = any

/**
 * Looks through each value in the list, returning the first one that passes a truth test (predicate), or undefined if no value passes the test. The function returns as soon as it finds an acceptable element, and doesn't traverse the entire list. predicate is transformed through iteratee to facilitate shorthand syntaxes.
 * @param {Array | Object} list
 * @param {*} predicate
 */
export const find = (list = [], predicate) => {
  if (!list) return undefined
  return (Array.isArray(list) ? list : Object.values(list)).find(baseIteratee(predicate))
}

/**
 * Returns the minimum value in list. If an iteratee function is provided, it will be used on each value to generate the criterion by which the value is ranked. Infinity is returned if list is empty, so an isEmpty guard may be required. This function can currently only compare numbers reliably. This function uses operator < (note).
 * @param {Array | Object} obj
 * @param {*} iteratee
 * @param {*} context - Never used as an explicit param, just used for .call()
 */
export const min = (obj, iteratee, context) => {
  if (!iteratee && Array.isArray(obj) && obj[0] === +obj[0]) {
    return Math.min.apply(Math, obj)
  }
  let result = Infinity
  let lastComputed = Infinity
  const listee = Array.isArray(obj) ? obj : Object.values(obj)
  listee.forEach((value, index, list) => {
    const computed = iteratee ? iteratee.call(context, value, index, list) : value
    if (computed < lastComputed) {
      result = value
      lastComputed = computed
    }
  })
  return result
}

/**
 * Returns the maximum value in list. If an iteratee function is provided, it will be used on each value to generate the criterion by which the value is ranked. -Infinity is returned if list is empty, so an isEmpty guard may be required. This function can currently only compare numbers reliably. This function uses operator < (note).
 * @param {Array | Object} obj
 * @param {*} iteratee
 * @param {*} context
 */
export const max = (obj, iteratee, context) => {
  if (!iteratee && Array.isArray(obj) && obj[0] === +obj[0]) {
    return Math.max.apply(Math, obj)
  }
  let result = -Infinity
  let lastComputed = -Infinity
  const listee = Array.isArray(obj) ? obj : Object.values(obj)
  listee.forEach((value, index, list) => {
    const computed = iteratee ? iteratee.call(context, value, index, list) : value
    if (computed > lastComputed) {
      result = value
      lastComputed = computed
    }
  })
  return result
}

/**
 * Returns the values in list without the elements that the truth test (predicate) passes. The opposite of filter. predicate is transformed through iteratee to facilitate shorthand syntaxes.
 * @param {Array | Object} list
 * @param {String | Function} predicate
 */
export const reject = (list = [], predicate) => {
  if (!list) return []
  const complement = function (f) {
    return function (x) {
      return !f(x)
    }
  }
  return (Array.isArray(list) ? list : Object.values(list)).filter(complement(baseIteratee(predicate)))
}

/**
 * Iterates over a list of elements, yielding each in turn to an iteratee function. The iteratee is bound to the context object, if one is passed. Each invocation of iteratee is called with three arguments: (element, index, list). If list is a JavaScript object, iteratee's arguments will be (value, key, list). Returns the list for chaining.
 * @param {Array | Object} list
 * @param {Function} iteratee
 */
export const each = (list, iteratee) => {
  if (!list) return []
  if (Array.isArray(list)) return list.forEach(iteratee)
  return Object.entries(list).forEach(([key, value]) => iteratee(value, key))
}

/**
 * Produces a new array of values by mapping each value in list through a transformation function (iteratee). The iteratee is passed three arguments: the value, then the index (or key) of the iteration, and finally a reference to the entire list.
 * @param {Array | Object} list
 * @param {Iteratee} iteratee
 */
export const map = (list = [], iteratee) => {
  if (!list) return []
  if (Array.isArray(list)) return list.map(iteratee)
  const results = []
  Object.keys(list).map((key) => {
    results.push(iteratee(list[key], key))
  })
  return results
}

/**
 * A convenient version of what is perhaps the most common use-case for map: extracting a list of property values.
 * @param {Array | Object} list
 * @param {String} key
 */
export const pluck = (list = [], key) => {
  if (!list) return []
  if (Array.isArray(list)) {
    let results = []
    list.map((elm) => {
      if (elm && typeof elm[key] !== "undefined") results.push(elm[key])
    })
    return results
  }
  return list[key]
}

/**
 * Looks through the list and returns the first value that matches all of the key-value pairs listed in properties.
 * If no match is found, or if list is empty, undefined will be returned.
 * @param {Array | Object} list
 * @param {Object} properties
 */
export const findWhere = (list = {}, properties) => {
  if (!list) return undefined
  return (Array.isArray(list) ? list : Object.entries(list)).find((object) => isSubset(object, properties))
}

/**
 * Looks through each value in the list, returning an array of all the values that matches the key-value pairs listed in properties.
 * @param {Array | Object} list
 * @param {Object} properties
 */
export const where = (list = {}, properties) => {
  if (!list) return []
  return (Array.isArray(list) ? list : Object.entries(list)).filter((object) => isSubset(object, properties))
}
