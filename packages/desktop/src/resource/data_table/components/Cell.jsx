import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React, { useCallback, useContext, useMemo } from 'react'
import styled from 'styled-components'
import _ from 'underscore'

import { useLocalizedDate } from 'hooks/useLocalizedDate'
import { DataTableContext } from 'resource/data_table/static/DataTableContext'
import { CurrencyFormatter } from 'resource/formatters/CurrencyFormatter'
import { PercentageFormatter } from 'resource/formatters/PercentageFormatter'
import { PhoneNumberFormatter } from 'resource/formatters/PhoneNumberFormatter'
import { CONSTANTS } from 'src/constants'
import { Tooltip } from 'ui/tooltips/Tooltip'
import { Ninja } from 'ui/wrappers/Ninja'

const StyledCell = styled.td`
  position: relative;
  vertical-align: middle;

  padding: ${CONSTANTS.spacing.s};
  :first-child {
    padding-left: 24px;
  }
  :last-child {
    padding-right: 24px;
  }

  img {
    vertical-align: middle;
  }

  ${({ white_space_no_wrap }) => white_space_no_wrap && 'white-space: nowrap;'}
  ${({ text_right }) => text_right && 'text-align: right;'}
  ${({ centered }) => centered && 'text-align: center;'}
  ${({ fit }) =>
    fit &&
    `
    white-space: nowrap;
    width: 1%;
  `}
  ${({ withOnCellClick, toggle_details_on_click }) =>
    (withOnCellClick || toggle_details_on_click) && 'cursor: pointer;'}
  ${({ active }) =>
    active &&
    `
    font-size: bold;
    border-top: 1px solid ${COLORS.primary.normal};
  `}
`

const Cell = ({
  row,
  column,
  active,
  hover,
  detailsFormatter,
  toggle_details_on_click: props_toggle_details_on_click,
  toggleActiveRow,
}) => {
  const { dateFormatter } = useLocalizedDate()
  const { cellTooltipFormatter } = useContext(DataTableContext)
  const dependentValues = column.getRowMetaData ? column.getRowMetaData(row) : row

  const cellProps = {}
  const onCellClick = column.onCellClick
    ? () => column.onCellClick(row[column.key], dependentValues)
    : () => {
        /* do nothing */
      }
  const toggleActive = useCallback(() => toggleActiveRow(row.key), [toggleActiveRow, row])
  const not_clickable = _.isFunction(column.not_clickable)
    ? column.not_clickable(row[column.key], dependentValues)
    : column.not_clickable
  const hover_only = _.isFunction(column.hover_only)
    ? column.hover_only(row[column.key], dependentValues)
    : column.hover_only
  const withOnCellClick = !!column.onCellClick && !not_clickable
  const toggle_details_on_click =
    !!detailsFormatter &&
    (_.isFunction(props_toggle_details_on_click)
      ? props_toggle_details_on_click(row)
      : props_toggle_details_on_click)

  if (withOnCellClick || toggle_details_on_click) {
    cellProps.onClick = () => {
      onCellClick()
      if (detailsFormatter) toggleActive()
    }
  }

  let { formatter } = column
  if (!formatter && column.type) {
    if (column.type === 'date') formatter = dateFormatter('date.explicit')
    if (column.type === 'phone_number') {
      formatter = PhoneNumberFormatter.formatter()
    } else if (column.type === 'currency') {
      let formatter_props = column.type_formatter_props || {}
      if (_.isFunction(formatter_props)) formatter_props = formatter_props(row)

      formatter = CurrencyFormatter.formatter(
        !!formatter_props.colored,
        !!formatter_props.inversed,
        !!formatter_props.bold,
        !!formatter_props.strict,
        !!formatter_props.show_operator,
      )
    } else if (column.type === 'percentage') {
      formatter = PercentageFormatter.formatter()
    }
  }

  const cell_content = useMemo(
    () =>
      formatter
        ? formatter(row[column.key], dependentValues, { toggleActive, active, hover })
        : row[column.key],
    [formatter, row, column.key, dependentValues, toggleActive, active, hover],
  )

  let cell_tag = <Ninja hidden={hover_only && !hover}>{cell_content}</Ninja>
  if (typeof cellTooltipFormatter === "function") {
    const tooltip_content = cellTooltipFormatter(row, column)
    cell_tag = <Tooltip html={tooltip_content}>{cell_tag}</Tooltip>
  }

  return (
    <StyledCell
      {...cellProps}
      key={column.key}
      active={active}
      {..._.omit(column, ['onCellClick'])}
      withOnCellClick={withOnCellClick}
      toggle_details_on_click={toggle_details_on_click}
    >
      {cell_tag}
    </StyledCell>
  )
}

Cell.propTypes = {
  column: PropTypes.shape({
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    cellProps: PropTypes.string,
    type: PropTypes.oneOf(['date', 'currency', 'phone_number', 'percentage']),
    type_formatter_props: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    not_clickable: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    hover_only: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    formatter: PropTypes.func,
    getRowMetaData: PropTypes.func,
    onCellClick: PropTypes.func,
  }),
  row: PropTypes.shape({
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  active: PropTypes.bool,
  hover: PropTypes.bool.isRequired,
  detailsFormatter: PropTypes.func,
  toggle_details_on_click: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  toggleActiveRow: PropTypes.func,
}

Cell.defaultProps = {
  active: false,
}

export { Cell }
