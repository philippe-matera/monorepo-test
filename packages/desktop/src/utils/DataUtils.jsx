import { Utils } from 'utils/Utils'

// Direction is "ASC", "DESC", "NONE"
const defaultCompare = (a, b, direction) => {
  let sort_factor = 1
  if (direction === 'DESC') sort_factor = -1

  // modifying a string won't change the original one
  /* eslint-disable no-param-reassign */
  if (typeof a === 'string') a = Utils.sanitizeString(a)
  if (typeof b === 'string') b = Utils.sanitizeString(b)
  /* eslint-enable no-param-reassign */

  if (a > b || b === null) return sort_factor
  else if (a < b || a === null) return -sort_factor

  return 1
}

export const DataUtils = { defaultCompare }
