import PropTypes from 'prop-types'
import React, { useContext } from 'react'

import useHover from 'hooks/useHover'
import { Cell } from 'resource/data_table/components/Cell'
import { ActiveRowDetails } from 'resource/data_table/components/row/ActiveRowDetails'
import { DefaultRow } from 'resource/data_table/components/row/DefaultRow'
import { DataTableContext } from 'resource/data_table/static/DataTableContext'

const Row = props => {
  const { columns, row_renderer } = useContext(DataTableContext)
  const [hover_ref, hover] = useHover()
  const { no_border } = useContext(DataTableContext)

  const infos = columns.map(column => (
    <Cell key={column.key} column={column} {...props} hover={hover} />
  ))

  let activeRowDetails
  if (props.active && props.detailsFormatter) {
    activeRowDetails = (
      <ActiveRowDetails
        row={props.row}
        detailsFormatter={props.detailsFormatter}
        toggleActiveRow={props.toggleActiveRow}
        no_border={no_border}
        col_span={columns.length}
        background_color={props.background_color}
      />
    )
  }

  const RowComponent = row_renderer || DefaultRow

  return (
    <>
      <RowComponent key={props.row.key} ref={hover_ref} {...props} hover={hover}>
        {infos}
      </RowComponent>
      {activeRowDetails}
    </>
  )
}

Row.propTypes = {
  row: PropTypes.shape({
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  active: PropTypes.bool,
  highlight: PropTypes.bool,
  detailsFormatter: PropTypes.func,
  toggle_details_on_click: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  toggleActiveRow: PropTypes.func,
  background_color: PropTypes.string,
}

Row.defaultProps = {
  active: true,
  highlight: false,
}

export { Row }
