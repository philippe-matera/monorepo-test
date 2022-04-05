import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { PaddedContent } from 'ui/cards/components/PaddedContent'

const ClickableContent = styled(PaddedContent)`
  &:hover {
    background-color: ${COLORS.gray[100]};
  }

  ${({ disabled }) => disabled && 'cursor: not-allowed;'}

  ${({ disabled }) =>
    !disabled &&
    `
      cursor: pointer;

      &:active {
        background-color: ${COLORS.gray[200]};
      }
  `}
`
ClickableContent.propTypes = {
  disabled: PropTypes.bool,
}

ClickableContent.defaultProps = {
  disabled: false,
}

export { ClickableContent }
