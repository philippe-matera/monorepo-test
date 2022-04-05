import PropTypes from 'prop-types'
import React, { useContext } from 'react'

import { FooterCell } from 'resource/data_table/components/FooterCell'
import { DataTableContext } from 'resource/data_table/static/DataTableContext'

const FooterRow = ({ row }) => {
  const { columns } = useContext(DataTableContext)

  const infos = columns.map(column => <FooterCell key={column.key} column={column} row={row} />)

  return <tr key={row.id || row.key}>{infos}</tr>
}

FooterRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  row: PropTypes.object,
}

export { FooterRow }
