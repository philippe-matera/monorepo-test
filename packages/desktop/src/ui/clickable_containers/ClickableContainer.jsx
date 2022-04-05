import { COLORS } from '@matera-tech/utils'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'

const ClickableContainer = styled.div`
  border-radius: 8px;
  cursor: pointer;

  transition: box-shadow 200ms ease-in-out;
  box-shadow: 0px 0px 0px 1px rgba(13, 22, 63, 0.1);
  ${({ padding }) => `padding: ${CONSTANTS.spacing[padding]};`}
  ${({ disabled }) =>
    disabled
      ? `
      pointer-events:none;
      `
      : `
      box-shadow: 0px 0px 0px 1px ${COLORS.primary.darker}1A, 0px 4px 6px -2px ${COLORS.primary.darker}0D;
      &:hover {
        box-shadow: 0px 0px 0px 1px ${COLORS.primary.light}, 0px 6px 12px -2px ${COLORS.primary.dark}14;
      }
      &:active {
        box-shadow: 0px 0px 0px 1px ${COLORS.primary.normal}, 0px 4px 6px -2px ${COLORS.primary.dark}1F;
      }
      `}
`

ClickableContainer.PropTypes = {
  padding: PropTypes.oneOf(['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

ClickableContainer.defaultProps = {
  padding: 'm',
  disabled: false,
}

export { ClickableContainer }
