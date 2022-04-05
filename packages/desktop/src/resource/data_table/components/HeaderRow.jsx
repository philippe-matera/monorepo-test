import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import styled from 'styled-components'

import { HeaderCell } from 'resource/data_table/components/HeaderCell'
import { DataTableContext } from 'resource/data_table/static/DataTableContext'

const StyledHeaderRow = styled.tr`
  text-align: left;
`

const HeaderRow = props => {
  const { columns } = useContext(DataTableContext)

  const infos = columns.map(column => (
    <HeaderCell key={column.key} column={column} onClickSortColumn={props.onClickSortColumn} />
  ))

  return <StyledHeaderRow>{infos}</StyledHeaderRow>
}

HeaderRow.propTypes = {
  onClickSortColumn: PropTypes.func,
}

export { HeaderRow }
