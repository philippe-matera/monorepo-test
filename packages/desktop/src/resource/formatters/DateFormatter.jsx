import React from 'react'

import { useLocalizedDate } from 'hooks/useLocalizedDate'

const formatter = date_format => value => {
  const { format } = useLocalizedDate()

  return value === undefined || value === '' || value === null ? (
    <div> - </div>
  ) : (
    <div>{format(value, date_format)}</div>
  )
}
export const DateFormatter = { formatter }
