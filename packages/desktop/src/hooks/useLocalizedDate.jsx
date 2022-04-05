import { formatDate, formatDistance } from '@matera-tech/utils/dist/lib/date-fns'
import { useCallback, useContext } from 'react'

import { UIContext } from 'src/UIContext'

const useLocalizedDate = () => {
  const { locale } = useContext(UIContext)

  const format = useCallback((date, date_format) => formatDate(date, date_format, locale), [locale])

  const formatFromNow = useCallback(
    (date, hide_suffix = false) => formatDistance(new Date(date), Date.now(), !hide_suffix, locale),
    [locale],
  )

  const dateFormatter = useCallback(
    date_format => value =>
      value === undefined || value === '' || value === null ? ' - ' : format(value, date_format),
    [format],
  )

  return {
    format,
    formatFromNow,
    dateFormatter,
  }
}

export { useLocalizedDate }
