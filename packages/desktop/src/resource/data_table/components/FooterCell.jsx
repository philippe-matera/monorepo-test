import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'

const StyledFooterCell = styled.td`
  position: relative;

  border-top: 1px solid #e7eaec;

  line-height: 1.42857;

  padding: ${CONSTANTS.spacing.s};
  vertical-align: middle;

  :first-child {
    padding-left: 24px;
  }
  :last-child {
    padding-right: 24px;
  }

  ${({ text_right }) => text_right && 'text-align: right;'}
  ${({ white_space_no_wrap }) => white_space_no_wrap && 'white-space: nowrap;'}
`

const FooterCell = ({ row, column }) => (
  <StyledFooterCell
    key={column.key}
    text_right={column.text_right}
    white_space_no_wrap={column.white_space_no_wrap}
  >
    {row[column.key]}
  </StyledFooterCell>
)

FooterCell.propTypes = {
  column: PropTypes.shape({
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    text_right: PropTypes.bool,
    white_space_no_wrap: PropTypes.bool,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  row: PropTypes.object,
}

export { FooterCell }
