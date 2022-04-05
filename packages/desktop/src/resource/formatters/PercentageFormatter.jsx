import React from 'react'

import { toPercentage } from 'lib/numeral'

const formatter = () => value =>
  value === undefined || value === '' || value === null ? (
    <div> - </div>
  ) : (
    <div>{toPercentage((value * 100).toString(), { precision: 2 })}</div>
  )

export const PercentageFormatter = { formatter }
