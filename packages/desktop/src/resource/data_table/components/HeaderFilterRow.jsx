import PropTypes from 'prop-types'
import React, { useContext, useMemo } from 'react'

import { HeaderFilterCell } from 'resource/data_table/components/HeaderFilterCell'
import { DataTableContext } from 'resource/data_table/static/DataTableContext'

const HeaderFilterRow = ({ placeholder, updateFilter }) => {
  const { columns, filters } = useContext(DataTableContext)

  const filter_cells = useMemo(
    () =>
      columns.map(column => (
        <HeaderFilterCell
          key={column.key}
          column={column}
          filter={filters[column.key]}
          placeholder={placeholder}
          updateFilter={updateFilter}
        />
      )),
    [columns, filters, placeholder, updateFilter],
  )

  return <tr>{filter_cells}</tr>
}

HeaderFilterRow.propTypes = {
  placeholder: PropTypes.string,
  updateFilter: PropTypes.func,
}

export { HeaderFilterRow }
