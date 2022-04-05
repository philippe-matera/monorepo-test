/**
 * Invokes the given iteratee function n times. Each invocation of iteratee is called with an index argument. Produces an array of the returned values.
 */
export const times = (length = 1, fn) => Array.from({length}, (_, x) => (fn ? fn(x) : x))
