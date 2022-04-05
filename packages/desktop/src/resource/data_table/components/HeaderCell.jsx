import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import styled from 'styled-components'

import useHover from 'hooks/useHover'
import { DataTableContext } from 'resource/data_table/static/DataTableContext'
import { CONSTANTS } from 'src/constants'
import { Icon } from 'ui/icons/Icon'

const StyledHeaderCell = styled.th`
  vertical-align: top;
  position: relative;

  padding: ${CONSTANTS.spacing.xs} ${CONSTANTS.spacing.s};

  color: ${COLORS.gray[900]};
  font-weight: 500;
  line-height: 24px;
  background-color: ${COLORS.gray[100]};

  ${({ white_space_no_wrap }) => white_space_no_wrap && 'white-space: nowrap;'}
  ${({ text_right }) => text_right && 'text-align: right;'}
  ${({ centered }) => centered && 'text-align: center;'}
  ${({ fit }) =>
    fit &&
    `
    white-space: nowrap;
    width: 1%;
  `}

  ${({ sortable, hover, active_sorting }) =>
    sortable &&
    `
    user-select: none;
    cursor: pointer;

    ${
      hover &&
      `
    color: ${COLORS.primary.normal};
    background-color: ${COLORS.gray[200]};
    `
    }

    &:active {
      background-color: ${COLORS.gray[300]};
    }

    ${active_sorting && `color: ${COLORS.primary.normal};`}
  `}
  :first-child {
    padding-left: 24px;
  }
  :last-child {
    padding-right: 24px;
  }
  a:not(.button) {
    color: ${COLORS.gray[900]};
  }
`

const CaretIcon = styled(Icon)`
  color: ${COLORS.primary.normal};

  display: inline;

  line-height: 24px;

  ${({ hidden }) => hidden && 'visibility: hidden;'}
`

const HeaderCell = ({ column, onClickSortColumn }) => {
  const { sorting } = useContext(DataTableContext)
  const [hover_ref, hover] = useHover({ hide_on_mobile: true })

  let content = column.headerRenderer || column.name
  let caret, onClick
  if (column.sortable) {
    if (hover && (sorting.column !== column.key || !sorting.direction)) {
      caret = <CaretIcon name="caret_up" />
    } else if (sorting.direction === 'ASC') {
      caret = <CaretIcon name="caret_up" hidden={sorting.column !== column.key} />
    } else {
      caret = (
        <CaretIcon name="caret_down" hidden={sorting.column !== column.key || !sorting.direction} />
      )
    }

    onClick = () => onClickSortColumn(column.key)

    content = (
      <>
        {column.text_right && caret}
        {content}
        {!column.text_right && caret}
      </>
    )
  }

  return (
    <StyledHeaderCell
      sortable={column.sortable}
      active_sorting={!!(sorting.column === column.key && sorting.direction)}
      key={column.key}
      className={column.headerClass}
      text_right={column.text_right}
      white_space_no_wrap={column.white_space_no_wrap}
      centered={column.centered}
      fit={column.fit}
      onClick={column.sortable ? onClick : undefined}
      ref={hover_ref}
      hover={hover}
    >
      {content}
    </StyledHeaderCell>
  )
}

HeaderCell.propTypes = {
  column: PropTypes.shape({
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    sortable: PropTypes.bool,
    headerClass: PropTypes.string,
    headerRenderer: PropTypes.element,
    text_right: PropTypes.bool,
    white_space_no_wrap: PropTypes.bool,
    centered: PropTypes.bool,
    fit: PropTypes.bool,
  }),
  onClickSortColumn: PropTypes.func,
}

export { HeaderCell }
