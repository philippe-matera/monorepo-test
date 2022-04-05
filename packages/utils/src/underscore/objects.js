/**
 * Returns the specified property of object. path may be specified as a simple key, or as an array of object keys or array indexes, for deep property fetching. If the property does not exist or is undefined, the optional default is returned.
 */
export const get = (obj = {}, path = "", defaultValue = undefined) => {
  const travel = (regexp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => res[key], obj)
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)
  return result === undefined || result === obj ? defaultValue : result
}

/**
 * Returns true if collection has no elements. For strings and array-like objects _.isEmpty checks if the length property is 0. For other objects, it returns true if the object has no enumerable own-properties. Note that primitive numbers, booleans and symbols are always empty by this definition.
 */
export const isEmpty = (obj = {}) => !obj || ([Object, Array].includes(obj.constructor) && !Object.entries(obj).length)

/**
 * Return a copy of the object, filtered to only have values for the allowed keys (or array of valid keys). Alternatively accepts a predicate indicating which keys to pick.
 * @param {Object} object
 * @param {Array | String | Function} keys - Can be a predicate
 */
export const pick = (object = {}, ...keys) => {
  let copy = {}
  const iteratee = keys.length === 1 ? keys[0] : keys
  Object.keys(object).map((key) => {
    if (
      (Array.isArray(iteratee) && iteratee.indexOf(key) > -1) ||
      (typeof iteratee === "string" && iteratee === key) ||
      (typeof iteratee === "function" && iteratee(object[key], key, object))
    )
      copy[key] = object[key]
  })
  return copy
}

/**
 * Returns true if object is NaN.
 * Note: this is not the same as the native isNaN function, which will also return true for many other not-number values, such as undefined.
 */
export const isNaN = (value) => Number.isNaN(value)

/**
 * Return a copy of the object, filtered to omit the disallowed keys (or array of keys). Alternatively accepts a predicate indicating which keys to omit.
 * @param {Object} list
 * @param {Array | String | Function} keys - Can be a predicate
 */
export const omit = (list = {}, ...keys) => {
  let copy = {}
  const iteratee = keys.length === 1 ? keys[0] : keys
  Object.keys(list).map((key) => {
    if (
      (Array.isArray(iteratee) && iteratee.indexOf(key) === -1) ||
      (typeof iteratee === "string" && iteratee !== key) ||
      (typeof iteratee === "function" && !iteratee(list[key], key, list))
    )
      copy[key] = list[key]
  })
  return copy
}
