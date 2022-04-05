import React from 'react'

import { numeral } from 'lib/numeral'
import { Text } from 'ui/typography/Text'

const standardizeArgs = args =>
  typeof args[0] === 'object'
    ? [args[0].colored, args[0].inverted, args[0].bold, args[0].strict, args[0].show_operator]
    : args

const notNullformatter = (colored, inversed, bold, strict, show_operator) => {
  if (!colored) return value => numeral.format(value)

  let coeff = 1
  if (inversed === true) coeff = -1

  return value => {
    const condition = strict ? parseFloat(value) === 0 : coeff * value >= 0

    return condition ? (
      <Text color="success" bold={bold === true}>
        {show_operator && parseFloat(value) !== 0 && <span>+ </span>}
        {numeral.format(value)}
      </Text>
    ) : (
      <Text color="danger" bold={bold === true}>
        {show_operator && <span>- </span>}
        {numeral.format(value)}
      </Text>
    )
  }
}

const formatter =
  (...args) =>
  value =>
    value === null || value === undefined ? '-' : notNullformatter(...standardizeArgs(args))(value)

export const CurrencyFormatter = { formatter }
