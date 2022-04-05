import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import styled from 'styled-components'

const CellDetails = styled.td`
  border-bottom: 1px solid ${COLORS.primary.normal};
`

const ActiveRowDetails = ({ row, detailsFormatter, toggleActiveRow, col_span }) => {
  const toggleActive = useCallback(() => toggleActiveRow(row.key), [toggleActiveRow, row])

  return (
    <tr key={`${row.key}-details`}>
      <CellDetails colSpan={col_span} key="activeRowDetails">
        {detailsFormatter(row, toggleActive)}
      </CellDetails>
    </tr>
  )
}

ActiveRowDetails.propTypes = {
  row: PropTypes.shape({
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  col_span: PropTypes.number.isRequired,
  detailsFormatter: PropTypes.func.isRequired,
  toggleActiveRow: PropTypes.func.isRequired,
}

export { ActiveRowDetails }
