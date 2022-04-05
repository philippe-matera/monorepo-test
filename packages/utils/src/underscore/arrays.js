import {max, pluck, baseIteratee} from "./collections"

/**
 * Returns a copy of the list with all falsy values removed. In JavaScript, false, null, 0, "", undefined and NaN are all falsy.
 * @param {Array} array
 */
export const compact = (array = []) => array.filter(Boolean)

/**
 * Similar to _.indexOf, returns the first index where the predicate truth test passes; otherwise returns -1.
 * @param {Array} array
 * @param {*} predicate
 */
export const findIndex = (array = [], predicate) => array.findIndex(baseIteratee(predicate))

/**
 * Returns the first element of an array. Passing n will return the first n elements of the array.
 * @param {Array} array
 * @param {Number} number
 */
export const first = (array = [], number) => {
  if (!number) return array[0]
  return array.slice(0, number)
}
/**
 * Returns the last element of an array. Passing n will return the last n elements of the array.
 * @param {Array} array
 * @param {Number} number
 */
export const last = (array = [], number) => {
  if (!number) return array[array.length - 1]
  return array.slice(number * -1)
}

/**
 * A function to create flexibly-numbered lists of integers, handy for each and map loops. start, if omitted, defaults to 0; step defaults to 1. Returns a list of integers from start (inclusive) to stop (exclusive), incremented (or decremented) by step. Note that ranges that stop before they start are considered to be zero-length instead of negative — if you'd like a negative range, use a negative step.
 */
export const range = (...args) => {
  let stop = args[1]
  let start = args[0]
  let step = args[2]
  if (args.length <= 1) {
    stop = args[0] || 0
    start = 0
  }
  if (!step) step = start < stop ? 1 : -1
  const length = Math.max(Math.abs(Math.ceil((stop - start) / step)), 0)
  return [...Array(length).keys()].map((k) => k * step + start)
}

/**
 * Returns the index at which value can be found in the array, or -1 if value is not present in the array.
 * @param {Array} array
 * @param {Any} value
 */
export const indexOf = (array = [], value) => array.indexOf(value)

/**
 * Produces a duplicate-free version of the array, using === to test object equality. In particular only the first occurrence of each value is kept. If you know in advance that the array is sorted, passing true for isSorted will run a much faster algorithm. If you want to compute unique items based on a transformation, pass an iteratee function.
 * @param {Array} array
 * @param {Boolean} isSorted
 * @param {any} iteratee
 */
export const uniq = (array = [], isSorted, iteratee) => {
  if (typeof isSorted !== "boolean") iteratee = isSorted
  if (!isSorted && !iteratee) return [...new Set(array)]
  const results = []
  const seen = []
  const iterator = baseIteratee(iteratee)
  array.map((elm, index) => {
    const value = iterator(elm, index, array)
    if (seen.indexOf(value) < 0) {
      results.push(elm)
      seen.push(value)
    }
  })
  return results
}
/**
 * Flattens a nested array. If you pass true or 1 as the depth, the array will only be flattened a single level. Passing a greater number will cause the flattening to descend deeper into the nesting hierarchy. Omitting the depth argument, or passing false or Infinity, flattens the array all the way to the deepest nesting level.
 * @param {Array} array
 * @param {Number} depth
 */
export const flatten = (array = [], depth) => array.flat(depth)

/**
 * Converts arrays into objects. Pass either a single list of [key, value] pairs, or a list of keys, and a list of values. Passing by pairs is the reverse of pairs. If duplicate keys exist, the last value wins.
 * @param {Array} list
 * @param {Array} values
 */
export const object = (list, values) => {
  if (list == null) return {}
  const result = {}
  list.forEach((value, index) => {
    if (values) {
      result[value] = values[index]
    } else {
      result[value[0]] = value[1]
    }
  })
  return result
}

/**
 * Returns a copy of the array with all instances of the values removed.
 * @param {Array} arrays
 * @param {any} values - each value should be given separately and will be compared with ===
 */
export const without = (array = [], ...values) => array.filter((val) => values.indexOf(val) < 0)

/**
 * Similar to without, but returns the values from array that are not present in the other arrays.
 */
export const difference = (arr1 = [], arr2 = []) => [arr1, arr2].reduce((a, b) => a.filter((c) => !b.includes(c)))

/**
 * Merges together the values of each of the arrays with the values at the corresponding position. Useful when you have separate data sources that are coordinated through matching array indexes.
 * @param {Array} args - Each element needs to be un array
 */
export const zip = (...args) => {
  const length = max(pluck(args, "length").concat(0))
  const results = []
  for (let i = 0; i < length; ++i) {
    results.push(pluck(args, "" + i))
  }
  return results
}
