import _ from 'underscore'

import moment from 'lib/moment'
import { numeral } from 'lib/numeral'
import { PhoneNumberFormatter } from 'resource/formatters/PhoneNumberFormatter'
import { Utils } from 'utils/Utils'

const filterRows = (rows, columns, filter) => {
  if (_.isEmpty(filter)) return rows

  return _.select(rows, row => {
    const searchable_columns = _.where(columns, { searchable: true })

    return _.any(searchable_columns, column => {
      if (!row[column.key]) return false

      let value
      if (column.getSearchValue) {
        value = Utils.sanitizeString(column.getSearchValue(row[column.key], row))
      } else if (column.type === 'date') {
        value = Utils.sanitizeString(moment.format(row[column.key], 'date.explicit'))
      } else if (column.type === 'currency') {
        value = Utils.sanitizeString(numeral.format(row[column.key]).replace(/\s/gu, ''))
      } else if (column.type === 'phone_number') {
        value = PhoneNumberFormatter.formatter()(row[column.key])
      } else {
        value = Utils.sanitizeString(row[column.key].toString())
      }

      return value.indexOf(Utils.sanitizeString(filter)) !== -1
    })
  })
}

export const DataTableUtils = { filterRows }
